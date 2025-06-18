// src/app/state/auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { AuthState } from './app.state';
import { signIn, signInSuccess, signInFailure, logout } from './auth.actions';

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,

  on(signIn, (state) => ({ ...state, loading: true })),
  
  on(signInSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user, // <-- ✅ must include full user object with `role`
    error: null,
    loading: false
  })),

  on(signInFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(logout, () => initialState)
);
