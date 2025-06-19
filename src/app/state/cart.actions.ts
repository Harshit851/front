// src/app/state/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product } from './app.state';

// Load from saved cart
export const loadCartFromStorage = createAction(
  '[Cart] Load From Storage',
  props<{ items: Product[] }>()
);

// Add item
export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; userEmail: string }>()
);

// Quantity +
export const incrementQty = createAction(
  '[Cart] Increment Quantity',
  props<{ productId: number; userEmail: string }>()
);

// Quantity -
export const decrementQty = createAction(
  '[Cart] Decrement Quantity',
  props<{ productId: number; userEmail: string }>()
);

// Remove
export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number; userEmail: string }>()
);
