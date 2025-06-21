import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ProductsComponent } from './products/products.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { productsReducer } from './state/products.reducer';
import { cartReducer } from './state/cart.reducer';
import { authReducer } from './state/auth.reducer';
import { ProductsEffects } from './state/products.effects';
import { AuthEffects } from './state/auth.effects';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './state/auth.guard';
import { AdminGuard } from './state/admin.guard';
import { AboutComponent } from './about/about.component';
import { CareersComponent } from './careers/careers.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      { path: 'about', component: AboutComponent },
      { path: 'careers', component: CareersComponent },
      { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
      { path: 'signin', component: SignInComponent },
      { path: 'signup', component: SignUpComponent },
      { path: '**', component: PageNotFoundComponent }
    ]),
    provideHttpClient(),
    provideStore({ products: productsReducer, cart: cartReducer, auth: authReducer }),
    provideEffects([ProductsEffects, AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideAnimations(),
    importProvidersFrom(ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      closeButton: true,
      progressBar: true
    }))
  ]
};
