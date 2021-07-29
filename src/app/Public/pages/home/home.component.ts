import { Component, OnInit } from '@angular/core';
import { OwlConfigService } from 'src/app/Services/owl-config.service';
import { ReadConfigService } from 'src/app/Services/read-config.service';
import { Music } from 'src/app/_model/music';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private limit: number =10;
  //Popular
  PopularOption:any = this.owl.customOptions;
  PopularSlides:any = this.read.Popular;

  NewSlides:any = this.read.New;


  alltrackes:Music[] = [];
 //iserror:boolean=false;
  

  constructor(public owl:OwlConfigService,public read:ReadConfigService) { }

  ngOnInit(): void {
    var slides:Window = this.PopularSlides;;
    console.log(this.PopularSlides);
    this.read.getalltracks(this.limit).subscribe((musics: Music[]) => {
         this.alltrackes = musics;         
    }, error => {
    //    this.iserror=true;
    //    setTimeout(() => {
    //     this.iserror=false;
    //    },2000);

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
