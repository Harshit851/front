import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { ProductsComponent } from './products.component';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { loadProducts } from '../state/products.actions';
import { addToCart } from '../state/cart.actions';
import { selectProducts } from '../state/products.selectors';
import { ProductsEffects } from '../state/products.effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppState } from '../state/app.state';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let store: Store<AppState>;
  let dispatchSpy: jasmine.Spy;

  const mockProducts = [
    { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg' },
    { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, ProductsComponent],
      providers: [
        provideStore(),
        provideEffects([ProductsEffects]),
        {
          provide: Store,
          useValue: {
            dispatch: jasmine.createSpy('dispatch'),
            select: jasmine.createSpy('select').and.callFake((selector) => {
              if (selector === selectProducts) {
                return of(mockProducts);
              }
              return of([]);
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    dispatchSpy = store.dispatch as jasmine.Spy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts action on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadProducts());
  });

  it('should select products from store', (done) => {
    component.products$.subscribe(products => {
      expect(products).toEqual(mockProducts);
      done();
    });
  });

  it('should dispatch addToCart action when addToCart is called', () => {
    const product = mockProducts[0];
    component.addToCart(product);
    expect(dispatchSpy).toHaveBeenCalledWith(addToCart({ product }));
  });
});