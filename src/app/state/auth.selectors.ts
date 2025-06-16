import { createSelector } from '@ngrx/store';

export const selectAuthState = (state: any) => state.auth;

export const selectCurrentUser = createSelector(
  selectAuthState,
  (auth) => auth.user?.username || null
);
