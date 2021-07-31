import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})
export class PagesComponent implements OnInit {

  constructor() { }
  loadOwl(req:string) {
    if(req == '4rowInit') {
      $(".owl-carousel.fourOwl").owlCarousel({
        margin:23,
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
        responsive:{
            0:{
                items:2
            },
            576: {
                items:3
            },
            992:{
                items:3
            },
            1000:{
                items:4
            }
        }
    });
    } else if(req == '5rowInit') {
      $(".owl-carousel.fiveOwl").owlCarousel({
        margin:23,
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        autoplay: false,
        autoplayTimeout: 4000,
        navText : ["<ion-icon name='chevron-back-outline'></ion-icon>","<ion-icon name='chevron-forward-outline'></ion-icon>"],
        responsive:{
            0:{
                items:2
            },
            576: {
                items:3
            },
            992:{
                items:3
            },
            1000:{
                items:4
            },
            1300:{
                items:5
            }
        }
    });
    }
  }
  ngOnInit(): void {
    
  }


}
