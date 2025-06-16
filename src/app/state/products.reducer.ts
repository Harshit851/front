import { createReducer, on } from '@ngrx/store';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from './products.actions';
import { Product } from './app.state';

export const initialState: Product[] = [];

export const productsReducer = createReducer(
  initialState,
  on(loadProductsSuccess, (state, { products }) => [...products]),
  on(loadProductsFailure, state => [...state])
);