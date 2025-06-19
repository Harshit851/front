import { createAction, props } from '@ngrx/store';
import { Product } from './app.state';

export const loadProducts = createAction(
  '[Products] Load Products',
  props<{ page: number }>() // ✅ Accept page number
);

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{
    products: Product[];
    currentPage: number;
    totalPages: number;
  }>() // ✅ Include pagination metadata
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);
