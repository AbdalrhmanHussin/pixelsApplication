
import { Component, OnInit } from '@angular/core';
import { LikeService } from 'src/app/Services/like.service';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { LikeInterface } from 'src/app/_model/like';
import { Music } from 'src/app/_model/music';
import { PagesComponent } from '../pages.component';
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  
  private limit: number =10;
  //Popular
  PopularSlides:any = this.read.Popular;
  NewSlides:any = this.read.New;


  alltrackes:any[] = [];
 //iserror:boolean=false;
  likes:any[]=[];

  constructor(
    public owl:PagesComponent,
    public read:ReadConfigService,
    public user:UserConfigService,
    private likeService: LikeService) { }
  
  
  ngOnInit(): void {
   
  
    this.likeService.likes.subscribe(data => {
      
      if (data) {
        if (data?.action === true) {
          this.getAllMusicLikes();
          
        }
       
      }
      
    })

    this.read.getalltracks(this.limit).subscribe((musics: Music[]) => {
         this.alltrackes = musics;
         setTimeout(() => {
          this.owl.loadOwl('5rowInit')
          this.owl.loadOwl('4rowInit')
        }, 10); 
    });
    this.getAllMusicLikes();
  }
  
  gettrackeByID(id:number):void{
      this.read.gettrackeByID(id).subscribe((res:{message:string,music:Music})=>{
        if(res.message==='success'){
          this.read.musictrack.next([
            res.music.src,
            res.music.name,
           res.music.band,
          res.music.img,
          res.music.id
          ]);
        }
        console.log(res);
        
        
      }, error => {
        console.error(error);
      });
  }


  getAllMusicLikes(): void {
    this.likeService.songLikes().subscribe((res: LikeInterface) => {
      console.log('profile', res);
      this.likes = res.likes;
      
    });
  }
 

}
