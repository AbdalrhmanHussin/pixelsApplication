import { Injectable } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';



@Injectable({
  providedIn: 'root'
})
export class OwlConfigService {
  customOptions: OwlOptions = {
    margin:23,
    lazyLoad: true,
    dots:false,
    loop: false,
    nav: true,
    autoplay: false,
    autoplayTimeout: 4000,
    navText : ["<i class='fas fa-chevron-left'></i>","<i class='fas fa-chevron-right'></i>"],
    responsive:{
        0:{
            items:4
        },
        576: {
            items:4
        },
        992:{
            items:4
        },
        1000:{
            items:4
        },
        1300:{
            items:5
        }
    }
  }
  constructor() { }
}
