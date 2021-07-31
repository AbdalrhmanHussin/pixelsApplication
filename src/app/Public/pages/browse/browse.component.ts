import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { Music } from 'src/app/_model/music';
import { user } from 'src/app/_model/user';
import { PagesComponent } from '../pages.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  private limit: number =10;
  alltrackes:Music[] = [];
  constructor(public owl:PagesComponent,public read:ReadConfigService,public user:UserConfigService) { }
  PopularSlides:any = this.read.Popular;
  NewSlides:any = this.read.New;
  ngOnInit(): void {
    this.read.getalltracks(this.limit).subscribe((musics: Music[]) => {
         this.alltrackes = musics;
         setTimeout(() => {
          this.owl.loadOwl('5rowInit')
        }, 10);
    })
  }
  gettrackeByID(id:number):void{
    this.read.gettrackeByID(id).subscribe((res:{message:string,music:Music})=>{
      if(res.message==='success'){
        this.read.musictrack.next([
          res.music.src,
          res.music.name,
         res.music.band,
        res.music.img
        ]);
      }
      console.log(res);
      
      
    }, error => {
      console.error(error);
    });
  }

}
