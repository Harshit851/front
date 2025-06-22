import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { ProductsState } from './products.reducer';

// 🌟 Step 1: Feature slice selector
export const selectProductsState = (state: AppState): ProductsState => state.products;

// 🌟 Step 2: Individual selectors from ProductsState

export const selectProducts = createSelector(
  selectProductsState,
  (state: ProductsState) => state.products
);

export const selectCurrentPage = createSelector(
  selectProductsState,
  (state: ProductsState) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectProductsState,
  (state: ProductsState) => state.totalPages
);
