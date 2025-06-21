// src/app/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { loadProducts } from '../state/products.actions';
import { addToCart } from '../state/cart.actions';
import { selectProducts } from '../state/products.selectors';
import { AppState, Product } from '../state/app.state';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  error: string | null = null;
  userEmail: string = '';

  currentPage = 1;
  totalPages = 1;
  searchTerm: string = ''; // ✅ store the query param

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.products$ = this.store.select(selectProducts);

    // ✅ Read query param and dispatch product load
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.store.dispatch(loadProducts({ page: this.currentPage, search: this.searchTerm }));
    });

    // Get logged-in user's email
    this.store.select(state => state.auth.user?.email)
      .subscribe(email => {
        this.userEmail = email || '';
      });

    // Pagination data
    this.store.select((state: any) => state.products.currentPage)
      .subscribe(page => this.currentPage = page || 1);

    this.store.select((state: any) => state.products.totalPages)
      .subscribe(total => this.totalPages = total || 1);
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product, userEmail: this.userEmail }));
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.store.dispatch(loadProducts({ page, search: this.searchTerm }));
    }
  }
}
