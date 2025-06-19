// src/app/state/products.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure
} from './products.actions';
import { Product } from './app.state';

export interface ProductsState {
  products: Product[];
  currentPage: number;
  totalPages: number;
}

export const initialState: ProductsState = {
  products: [],
  currentPage: 1,
  totalPages: 1
};

export const productsReducer = createReducer(
  initialState,

  on(loadProductsSuccess, (state, { products, currentPage, totalPages }) => ({
    ...state,
    products,
    currentPage,
    totalPages
  })),

  on(loadProductsFailure, state => ({
    ...state,
    products: []
  }))
);
