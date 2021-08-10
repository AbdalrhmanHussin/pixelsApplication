import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { Music } from 'src/app/_model/music';
import { PagesComponent } from '../pages.component';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private limit: number =10;
  popular:Music[]    = [];
  newRelease:Music[] = [];
  rand:Music[]       = [];

  constructor(public owl:PagesComponent,public read:ReadConfigService,public user:UserConfigService) { }
  
  
  ngOnInit(): void {
    //init the page to regular form
    $('.tb-page').removeAttr('style');
    this.read.getalltracks(this.limit,'popular').subscribe((musics: Music[]) => {
      this.popular = musics;
      setTimeout(() => {
        this.owl.loadOwl('4rowInit')
      }, 100); 
    });

    this.read.getalltracks(this.limit,'release').subscribe((musics: Music[]) => {
      this.newRelease = musics;
     
    });
    this.read.getalltracks(this.limit,'random').subscribe(async (musics: Music[]) => {
      this.rand = musics;
      setTimeout(() => {
        this.owl.loadOwl('5rowInit');
      },100);
      
    });

  }
  
}
