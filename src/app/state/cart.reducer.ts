// src/app/state/cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { addToCart, incrementQty, decrementQty, removeFromCart } from './cart.actions';
import { CartItem } from '../cart/cart.component';

export const initialState: CartItem[] = [];

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, { product }) => {
    const existing = state.find(item => item.id === product.id);
    if (existing) {
      return state.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }
    return [...state, { ...product, quantity: 1 }];
  }),
  on(incrementQty, (state, { productId }) =>
    state.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  ),
  on(decrementQty, (state, { productId }) =>
    state.map(item =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
  ),
  on(removeFromCart, (state, { productId }) =>
    state.filter(item => item.id !== productId)
  )
);
