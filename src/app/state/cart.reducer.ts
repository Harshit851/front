// src/app/state/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  addToCart,
  incrementQty,
  decrementQty,
  removeFromCart,
  loadCartFromStorage
} from './cart.actions';
import { CartItem } from '../cart/cart.component';

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,

 on(loadCartFromStorage, (_state, { items }) => {
    return items.map(item => {
      const i = item as Partial<CartItem>;
      return {
        ...item,
        quantity: i.quantity ?? 1
      };
    });
  }),

  on(addToCart, (state, { product, userEmail }) => {
    const existing = state.find(item => item.id === product.id);
    let updatedCart: CartItem[];

    if (existing) {
      updatedCart = state.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...state, { ...product, quantity: 1 }];
    }

    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updatedCart));
    }

    return updatedCart;
  }),

  on(incrementQty, (state, { productId, userEmail }) => {
    const updated = state.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updated));
    }

    return updated;
  }),

  on(decrementQty, (state, { productId, userEmail }) => {
    const updated = state.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updated));
    }

    return updated;
  }),

  on(removeFromCart, (state, { productId, userEmail }) => {
    const updated = state.filter(item => item.id !== productId);

    if (userEmail) {
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(updated));
    }

    return updated;
  })
);
