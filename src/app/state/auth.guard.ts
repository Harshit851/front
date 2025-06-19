import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { selectAuthState } from './auth.selectors';
import { AppState } from './app.state'; // ✅ using your existing file

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate() {
    return this.store.pipe(
      select(selectAuthState),
      take(1),
      map(auth => {
        if (auth.token) {
          return true;
        }
        this.router.navigate(['/signin']);
        return false;
      })
    );
  }
}
