import { createReducer, on } from '@ngrx/store';
import {
  signIn, signInSuccess, signInFailure,
  signUp, signUpSuccess, signUpFailure,
  logout // <-- Add this import
} from './auth.actions';
import { AuthState } from './app.state';

export const initialState: AuthState = {
  token: null,
  user: null,
  error: null,
  loading: false
};

export const authReducer = createReducer(
  initialState,
  on(signIn, state => ({ ...state, loading: true, error: null })),
  on(signInSuccess, (state, { token, user }) => ({ ...state, token, user, loading: false })),
  on(signInFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(signUp, state => ({ ...state, loading: true, error: null })),
  on(signUpSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(signUpFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(logout, state => ({
    ...state,
    user: null,
    token: null,
    error: null,
    loading: false
  }))
);
