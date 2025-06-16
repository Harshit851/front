import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signUp } from '../state/auth.actions';
import { selectAuthState } from '../state/auth.selectors';
import { AppState, AuthState } from '../state/app.state';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  authState$: Observable<AuthState>;
  user = { email: '', username: '', password: '' };

  constructor(private store: Store<AppState>) {
    this.authState$ = this.store.select(selectAuthState);
  }

  onSignUp() {
    this.store.dispatch(signUp({ user: this.user }));
  }
}