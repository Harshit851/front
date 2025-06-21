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
        let url = `/api/products?page=${page}&limit=10`;
        if (search && search.trim()) {
          url += `&search=${encodeURIComponent(search.trim())}`;
        }

        return this.http.get<any>(url).pipe(
          map(response =>
            loadProductsSuccess({
              products: response.products.map((item: any) => ({
                id: item.id,
                title: item.title,
                price: item.price,
                image: item.image
              })),
              currentPage: response.currentPage,
              totalPages: response.totalPages
            })
          ),
          catchError(() =>
            of(loadProductsFailure({ error: 'Failed to load products' }))
          )
        );
      })
    )
  );
}
