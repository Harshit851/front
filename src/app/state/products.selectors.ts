import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectProductsState = (state: AppState) => state.products;
export const selectProducts = createSelector(selectProductsState, (products) => products);