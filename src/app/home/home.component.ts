import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule} from "@angular/common"
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent { featuredProducts = [
    {
      title: 'Solid state drive',
      price: 2999,
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg'
    },
    {
      title: 'Gaming monitor Qled',
      price: 4999,
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg'
    },
    {
      title: 'Casual Shirt',
      price: 999,
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg'
    },
    {
      title: 'Backpack',
      price: 1999,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
    }
  ];

    currentIndex = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 4000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.featuredProducts.length;
  }

  prevSlide() {
    this.currentIndex =
      (this.currentIndex - 1 + this.featuredProducts.length) % this.featuredProducts.length;
  }
}