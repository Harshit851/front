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
  logout
} from './auth.actions';
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
          map((res) => {
            // Store token and user in localStorage
            localStorage.setItem('token', res.token);
            localStorage.setItem('currentUser', JSON.stringify(res));

            // Debug log
            console.log('Login response:', res);

            return signInSuccess({
              token: res.token,
              user: {
                email: res.email,
                username: res.username,
                role: res.role // ✅ Ensure backend sends this
              }
            });
          }),
          catchError((err) =>
            of(signInFailure({ error: err.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  // ✅ Redirect based on role after login
  redirectAfterSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(({ user }) => {
          console.log('Redirecting based on role:', user.role);
          if (user.role === 'admin') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/home']);
          }
        })
      ),
    { dispatch: false }
  );

  // 🆕 Sign Up Effect
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ user }) =>
        this.authService.register(user).pipe(
          map(() => signUpSuccess({ user })),
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
}
