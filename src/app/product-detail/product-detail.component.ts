import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Product } from '../state/app.state';
import { selectProducts } from '../state/products.selectors';
import { map, switchMap, of } from 'rxjs';
import { Observable } from 'rxjs';
import { addToCart } from '../state/cart.actions';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  product$!: Observable<Product | undefined>;
  related$!: Observable<Product[]>;
  isProcessing = false;
  private productId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    // ✅ First try to load from store, fallback to REST if not found
    this.product$ = this.store.select(selectProducts).pipe(
      switchMap(products => {
        const found = products.find(p => p.id === this.productId);
        return found
          ? of(found)
          : this.http.get<Product>(`https://fakestoreapi.com/products/${this.productId}`);
      })
    );

    // ✅ Related products from store
    this.related$ = this.store.select(selectProducts).pipe(
      map(products =>
        products.filter(p => p.id !== this.productId).slice(0, 4)
      )
    );
  }

  addProductToCart(product: Product) {
    const email = localStorage.getItem('currentUser')
      ? JSON.parse(localStorage.getItem('currentUser')!).email
      : '';

    this.isProcessing = true;
    this.store.dispatch(addToCart({ product, userEmail: email }));
    this.toastr.success('Product added to cart!');

    setTimeout(() => {
      this.isProcessing = false;
    }, 500);
  }

  buyNow(product: Product) {
    this.addProductToCart(product);
    this.toastr.info('Redirecting to cart...');
    this.router.navigate(['/cart']);
  }
}
