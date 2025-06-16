import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { logout } from '../state/auth.actions';
import { selectCurrentUser } from '../state/auth.selectors';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  username$;

  constructor(private store: Store) {
    this.username$ = this.store.select(selectCurrentUser);
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
