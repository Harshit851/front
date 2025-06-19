// src/app/products/products.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadProducts } from '../state/products.actions';
import { addToCart } from '../state/cart.actions';
import { selectProducts } from '../state/products.selectors';
import { AppState, Product } from '../state/app.state';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  error: string | null = null;
  userEmail: string = '';

  currentPage = 1;
  totalPages = 1;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.select(selectProducts);
    this.store.dispatch(loadProducts({ page: this.currentPage }));

    // Get logged-in user's email
    this.store.select(state => state.auth.user?.email)
      .subscribe(email => {
        this.userEmail = email || '';
      });

    // Get pagination info
    this.store.select((state: any) => state.products.currentPage)
      .subscribe(page => this.currentPage = page || 1);

    this.store.select((state: any) => state.products.totalPages)
      .subscribe(total => this.totalPages = total || 2);
  }

  addToCart(product: Product) {
    this.store.dispatch(addToCart({ product, userEmail: this.userEmail }));
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.store.dispatch(loadProducts({ page }));
    }
  }
}
