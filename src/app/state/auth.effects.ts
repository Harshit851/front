import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  logout
} from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private router = inject(Router);

  // Effect for sign in
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      mergeMap(({ username, password }) => {
        const usersJson = localStorage.getItem('users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        const user = users.find((u: any) => u.username === username && u.password === password);

        if (user) {
          localStorage.setItem('token', 'dummy-token');
          localStorage.setItem('currentUser', JSON.stringify(user));
          return of(signInSuccess({ token: 'dummy-token', user: { username } }));
        } else {
          return of(signInFailure({ error: 'Invalid credentials' }));
        }
      })
    )
  );

  // Redirect to home on successful sign in
  redirectAfterSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
        tap(() => {
          this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  // Effect for sign up
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUp),
      mergeMap(({ user }) => {
        const usersJson = localStorage.getItem('users');
        const users = usersJson ? JSON.parse(usersJson) : [];
        const existing = users.find((u: any) => u.username === user.username);
        if (existing) {
          return of(signUpFailure({ error: 'Username already exists' }));
        }
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        return of(signUpSuccess({ user }));
      })
    )
  );

  // Effect for logout
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
