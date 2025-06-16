// src/app/state/cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product } from './app.state'; // Adjust the path if needed

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product }>()
);

export const incrementQty = createAction(
  '[Cart] Increment Quantity',
  props<{ productId: number }>()
);

export const decrementQty = createAction(
  '[Cart] Decrement Quantity',
  props<{ productId: number }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ productId: number }>()
);
