import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import { selectUser } from '../state/auth.selectors';
import { selectCartItems } from '../state/cart.selectors';
import { logout } from '../state/auth.actions';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  user$: Observable<{ email?: string; username?: string; role?: string } | null>;
  cartCount$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
    this.cartCount$ = this.store.select(selectCartItems).pipe(
      map((items: any[]) =>
        items.reduce((total: number, item: any) => total + item.quantity, 0)
      )
    );
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
