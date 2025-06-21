import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  previewResults: any[] = [];
  socket!: Socket;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Connect to your Socket.io backend
    this.socket = io('http://localhost:3000'); // change if using different port

    // ✅ Listen for search results
    this.socket.on('searchPreviewResults', (data: any[]) => {
      this.previewResults = data;
    });
  }

  onInputChange() {
    const keyword = this.searchTerm.trim();
    if (keyword) {
      this.socket.emit('searchPreview', { keyword });
    } else {
      this.previewResults = [];
    }
  }

  selectResult(title: string) {
    this.searchTerm = title;
    this.previewResults = [];
    this.onSubmit();
  }

  onSubmit() {
    const trimmed = this.searchTerm.trim();
    this.previewResults = []; // clear dropdown
    if (trimmed) {
      this.router.navigate(['/products'], {
        queryParams: { search: trimmed }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
