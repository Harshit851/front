import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signIn } from '../state/auth.actions';
import { selectAuthState } from '../state/auth.selectors';
import { AppState, AuthState } from '../state/app.state';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SignInComponent {
  authState$: Observable<AuthState>;
  username: string = '';
  password: string = '';

  constructor(private store: Store<AppState>) {
    this.authState$ = this.store.select(selectAuthState);
  }

  onSignIn() {
    this.store.dispatch(signIn({ username: this.username, password: this.password }));
  }
}