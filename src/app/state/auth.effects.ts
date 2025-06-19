// src/app/state/auth.effects.ts
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  logout,
  loadUserFromStorage
} from './auth.actions';
import { loadCartFromStorage } from './cart.actions'; // ✅ new import
import { AuthService } from './auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);
  private authService = inject(AuthService);

  // 🔐 Login Effect
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      mergeMap(({ email, password }) =>
        this.authService.login({ email, password }).pipe(
          mergeMap((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('currentUser', JSON.stringify(res));

            const savedCart = localStorage.getItem(`cart_${res.email}`);
            const cartItems = savedCart ? JSON.parse(savedCart) : [];

            return [
              signInSuccess({
                token: res.token,
                user: {
                  email: res.email,
                  username: res.name,
                  role: res.role || 'user'
                }
              }),
              loadCartFromStorage({ items: cartItems }) // ✅ load cart for user
            ];
          }),
          catchError((err) =>
            of(signInFailure({ error: err.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  // ✅ Redirect After Login (based on user role)
  redirectAfterSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(({ user }) => {
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  // 🆕 Sign Up Effect → Auto login on success
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          mergeMap((res) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('currentUser', JSON.stringify(res));

            const savedCart = localStorage.getItem(`cart_${res.email}`);
            const cartItems = savedCart ? JSON.parse(savedCart) : [];

            return [
              signInSuccess({
                token: res.token,
                user: {
                  email: res.email,
                  username: res.name,
                  role: res.role || 'user'
                }
              }),
              loadCartFromStorage({ items: cartItems }) // ✅ load cart for user
            ];
          }),
          catchError((err) =>
            of(signUpFailure({ error: err.error?.message || 'Signup failed' }))
          )
        )
      )
    )
  );

  // 🚪 Logout Effect
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/signin']);
        })
      ),
    { dispatch: false }
  );

  // 🔁 Auto Login Effect (on app reload)
  autoLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserFromStorage),
      map(() => {
        const userJson = localStorage.getItem('currentUser');
        const token = localStorage.getItem('token');

        if (userJson && token) {
          const user = JSON.parse(userJson);
          return signInSuccess({ token, user });
        } else {
          return logout();
        }
      })
    )
  );
}
