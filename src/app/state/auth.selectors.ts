import { createSelector } from '@ngrx/store';
import { AppState, AuthState } from './app.state';

// 1. Select the full auth state slice
export const selectAuthState = (state: AppState) => state.auth;



// 4. Select auth token
export const selectAuthToken = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.token
);

// 5. Select loading flag
export const selectAuthLoading = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.loading
);

// 6. Select error message
export const selectAuthError = createSelector(
  selectAuthState,
  (auth: AuthState) => auth.error
);

export const selectUser = createSelector(
  selectAuthState,
  (auth) => auth.user || null
);

