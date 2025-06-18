import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { logout } from '../state/auth.actions';
import { RouterModule } from '@angular/router';
import { selectUser } from '../state/auth.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<{ email?: string; username?: string; role?: string } | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
