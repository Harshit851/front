import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  previewResults: any[] = [];
  socket!: Socket;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.socket = io('http://localhost:3000');

    this.socket.on('searchPreviewResults', (data: any[]) => {
      this.previewResults = data;
    });
  }

  onInputChange() {
    const keyword = this.searchTerm.trim();
    if (keyword) {
      this.fetchGraphQLPreview(keyword); // use GraphQL instead of socket
    } else {
      this.previewResults = [];
    }
  }

  fetchGraphQLPreview(keyword: string) {
    const query = `
      query {
        products(search: "${keyword}") {
          id
          title
          price
          image
          description
        }
      }
    `;

    this.http.post<any>('http://localhost:3000/graphql', { query }).subscribe(
      res => {
        this.previewResults = res.data?.products || [];
      },
      err => {
        console.error('🔴 GraphQL search error:', err);
        this.previewResults = [];
      }
    );
  }

  selectResult(title: string) {
    this.searchTerm = title;
    this.previewResults = [];
    this.onSubmit();
  }

  onSubmit() {
    const trimmed = this.searchTerm.trim();
    this.previewResults = [];
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
