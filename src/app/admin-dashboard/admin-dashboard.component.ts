// src/app/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { selectUser } from '../state/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  user$: Observable<{ email?: string; username?: string; role?: string } | null>;

  constructor(private store: Store<AppState>) {
    this.user$ = this.store.select(selectUser);
  }
}
