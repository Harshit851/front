// src/app/state/cart.selectors.ts
import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectCartState = (state: AppState) => state.cart;

export const selectCartItems = createSelector(
  selectCartState,
  (cartItems) => cartItems // <-- cartItems is already an array
);