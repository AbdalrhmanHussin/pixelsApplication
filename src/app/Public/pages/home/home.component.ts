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
  //Popular
  PopularSlides:any = this.read.Popular;
  NewSlides:any = this.read.New;


  alltrackes:Music[] = [];
 //iserror:boolean=false;
  

  constructor(public owl:PagesComponent,public read:ReadConfigService,public user:UserConfigService) { }
  
  
  ngOnInit(): void {
  
    this.read.getalltracks(this.limit).subscribe((musics: Music[]) => {
         this.alltrackes = musics;
         setTimeout(() => {
          this.owl.loadOwl('5rowInit')
          this.owl.loadOwl('4rowInit')
        }, 10); 
    });
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
