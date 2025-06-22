import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure
} from './products.actions';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(({ page, search }) => {
        if (search && search.trim()) {
          // ✅ GraphQL for search
          const graphqlQuery = {
            query: `
              query ($search: String, $sortBy: String, $order: String) {
                products(search: $search, sortBy: $sortBy, order: $order) {
                  id
                  title
                  price
                  image
                  description
                }
              }
            `,
            variables: {
              search: search.trim(),
              sort: 'asc'
            }
          };

          return this.http.post<any>('http://localhost:3000/graphql', graphqlQuery).pipe(
            map(res =>
              loadProductsSuccess({
                products: res.data.products,
                currentPage: 1,
                totalPages: 1
              })
            ),
            catchError(error => {
              console.error('GraphQL search failed:', error);
              return of(loadProductsFailure({ error: 'GraphQL search failed' }));
            })
          );
        } else {
          // ✅ REST fallback for pagination
          const url = `/api/products?page=${page}&limit=10`;

          return this.http.get<any>(url).pipe(
            map(response =>
              loadProductsSuccess({
                products: response.products.map((item: any) => ({
                  id: item.id,
                  title: item.title,
                  price: item.price,
                  image: item.image,
                  description: item.description
                })),
                currentPage: response.currentPage,
                totalPages: response.totalPages
              })
            ),
            catchError(() =>
              of(loadProductsFailure({ error: 'Failed to load products' }))
            )
          );
        }
      })
    )
  );
}
