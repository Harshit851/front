import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({ selector: 'app-home', template: '' })
class HomeStubComponent {}

@Component({ selector: 'app-cart', template: '' })
class CartStubComponent {}

@Component({ selector: 'app-products', template: '' })
class ProductsStubComponent {}

@Component({ selector: 'app-signin', template: '' })
class SignInStubComponent {}

@Component({ selector: 'app-signup', template: '' })
class SignUpStubComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        RouterModule,
        AppComponent,
        NavbarComponent,
        HomeStubComponent,
        CartStubComponent,
        ProductsStubComponent,
        SignInStubComponent,
        SignUpStubComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });
});