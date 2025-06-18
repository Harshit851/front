// src/app/cart/cart.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { selectCartItems } from '../state/cart.selectors';
import { AppState, Product } from '../state/app.state';
import { incrementQty, decrementQty, removeFromCart } from '../state/cart.actions';

export interface CartItem extends Product {
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems$: Observable<CartItem[]>;
  shipping = 4.99;

  constructor(private store: Store<AppState>) {
    this.cartItems$ = this.store.select(selectCartItems);
  }

  calculateSubtotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateTotal(cartItems: CartItem[]): number {
    return this.calculateSubtotal(cartItems) + this.shipping;
  }

  incrementQty(item: CartItem) {
    this.store.dispatch(incrementQty({ productId: item.id }));
  }

  decrementQty(item: CartItem) {
    this.store.dispatch(decrementQty({ productId: item.id }));
  }

  removeItem(item: CartItem) {
    this.store.dispatch(removeFromCart({ productId: item.id }));
  }

  checkout() {
    // Implement checkout logic here
    alert('Proceeding to checkout!');
  }
}
