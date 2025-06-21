import { Component } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, Product } from '../state/app.state';
import { selectProducts } from '../state/products.selectors';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { addToCart } from '../state/cart.actions';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private toastr: ToastrService
  ) {
    const productId = +this.route.snapshot.paramMap.get('id')!;

    this.product$ = this.store.select(selectProducts).pipe(
      map(products => products.find(p => p.id === productId))
    );

    this.related$ = this.store.select(selectProducts).pipe(
      map(products =>
        products.filter(p => p.id !== productId).slice(0, 4)
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
