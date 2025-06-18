import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { signUp } from '../state/auth.actions';
import { AppState } from '../state/app.state';
import { selectAuthError, selectAuthLoading, selectAuthState } from '../state/auth.selectors';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  error$: Observable<string | null>;
  loading$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.error$ = this.store.select(selectAuthError);
    this.loading$ = this.store.select(selectAuthLoading);
    this.user$ = this.store.select(selectAuthState).pipe(map(state => state.user));
  }

  onSignUp() {
    this.store.dispatch(signUp({ user: { name: this.name, email: this.email, password: this.password } }));
  }
}
