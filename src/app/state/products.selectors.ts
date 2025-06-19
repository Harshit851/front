import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectProductsState = (state: AppState) => state.products;

export const selectProducts = createSelector(
  selectProductsState,
  (state) => state.products // ✅ Now accessing state.products instead of just state
);

export const selectCurrentPage = createSelector(
  selectProductsState,
  (state) => state.currentPage
);

export const selectTotalPages = createSelector(
  selectProductsState,
  (state) => state.totalPages
);
