import { Component, OnInit } from '@angular/core';
import { ReadConfigService } from 'src/app/Services/read-config.service';

@Component({
  selector: 'app-musicplayer',
  templateUrl: './musicplayer.component.html',
  styleUrls: ['./musicplayer.component.css']
})
export class MusicplayerComponent implements OnInit {


  constructor(private read:ReadConfigService) {
    
   }
  path:any = 'https://drive.google.com/uc?export=download&id=';
  music = new Audio();
  interval:any;
  ps:any;
  perc:any;
  prop:boolean = false;
  playCounter:number = 0;
  playTarget:boolean = false;
  time:string = '00:00';
  curr:string = '00:00';
  loader:boolean = false;
  playImg:string = '';
  songTitle:string = '';
  band:string = '';
  trigger:boolean = false;
  vol:boolean = false;
  scope:any;
  payload:any[] = [

   [ '1tT3YaSxjF9U5fwPxjyuGQGeoR6K6XwUa','Imagine Dragon','Natural','http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-28.png'],
   [ '11V_iZ9Q-ni3Kp_f_JTFjVcqM8csjAMGV','Bring me to life','Evanscence','http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-23.png'],
  ];

  barwidth:any = 0;
  volwidth:any = 50;
  duration:string = '';
  playlist = 'none';
  playlistLocker = 0;
  load() {
    this.loader=true;
    this.music.src = this.path + this.payload[this.playCounter][0];
    this.playImg = this.payload[this.playCounter][3];
    this.songTitle = this.payload[this.playCounter][2];
    this.band = this.payload[this.playCounter][1];
    this.music.addEventListener('loadeddata',():void => {
       this.loader = false;
       this.time = this.timeSet(this.music.duration);
    });
  }
  int(intervalStart:boolean) {
      console.log(intervalStart);
      if(intervalStart) {
         this.interval = setInterval(():void => {
            console.log('hello');
            this.curr = this.timeSet(this.music.currentTime);
            this.barwidth = (this.music.currentTime/this.music.duration)*100 + '%';
         },1000);

      } else {
         clearInterval(this.interval);
      }
  }
  timeSet(time:number) {
    let min:any = Math.floor(time/60);
    let sec:any = Math.floor(time%60);
    min = (min < 10) ? '0' + min : min; 
    sec = (sec < 10) ? '0' + sec : sec;
    return min + ':' + sec;
  }
  play() {
    if(this.music.src == "") {
      this.load();
    }
    if(this.music.paused) {
      this.playTarget = true;
      this.music.play();
      this.int(true);
    }  else {
      this.playTarget = false;
      this.music.pause();
      this.int(false);
    }
  }
  ready(counter:number) {
   this.music.pause;
   this.load();
   this.play();
  }
  next() {
    this.playCounter++;
    if(this.playCounter > this.payload.length - 1) {
      this.playCounter = 0;
    } 
    this.ready(this.playCounter);
  }
  prev() {
    this.playCounter--;
    if(this.playCounter < 0) {
      this.playCounter = this.payload.length - 1;
      console.log(this.playCounter);
    }
    this.ready(this.playCounter);
  }
  drag(event:MouseEvent) {
      if(this.trigger) {
          let bar:any = document.querySelector('.progressBar');
          let spaceArea = bar.getBoundingClientRect().x;
          let mouseLocation = event.pageX;
          let initPoint = mouseLocation - spaceArea;
          let perc   =  initPoint/bar.clientWidth;
          let percAcc = (perc < 1 && perc > 0) ? perc : (perc < 0) ? 0 : 1; 
          this.barwidth = percAcc*100 + '%';
          this.music.currentTime = this.music.duration *  percAcc;
          console.log(perc);
      }
        
  }
  volume(event:MouseEvent) {
    if(this.vol) {
      let bar:any = document.querySelector('#volpr');
      let spaceArea = bar.getBoundingClientRect().x;
      let mouseLocation = event.pageX;
      let initPoint = mouseLocation - spaceArea;
      let perc   =  initPoint/bar.clientWidth;
      let percAcc = (perc < 1 && perc > 0) ? perc : (perc < 0) ? 0 : 1; 
      this.volwidth = percAcc*100 + '%';
      this.music.volume = percAcc;
    }
  }
  reset() {
    this.playCounter = 0;
    this.barwidth    = 0;
    this.curr       = '00:00';
    this.playTarget  = false;
  }
  playlistInc() {
    console.log(this.playlistLocker == 0);
      (this.playlistLocker == 0) ? 1 : 0;
      console.log(this.playlistLocker);
  }
   /*rania start*/
  ngOnInit(): void {
    this.read.musictrack.subscribe((data)=>{
      if(data){
        this.playCounter=this.payload.length;
        console.log("music rania",data);
        this.payload.push(data);
        console.log("raniaaaa",this.payload);
     
        this.ready(this.playCounter);
      }
      
       
    });
    /*rania end*/
    this.music.volume = 0.5;
    let ball:any = document.getElementById('ball');
    let ballVl:any = document.getElementById('ballVl');
    ball.addEventListener('mousedown',():void => {
      this.trigger = true;
    });
    ballVl.addEventListener('mousedown',():void => {
         this.vol = true;
         console.log('true');
    });
    document.addEventListener('mouseup',():void => {
      if(this.trigger) {
         this.int(true);
         this.trigger = false;
      }
      if(this.vol) {
         this.vol = false;
      }
    });

    document.addEventListener('mousemove',(event:MouseEvent):void => {
       
       this.drag(event);
       this.volume(event);
    });
    this.music.addEventListener('ended',():void => {
      if(this.playlistLocker == 0) {
         if(this.playCounter == this.payload.length - 1) {
              this.reset();
              alert('play:' + this.playCounter);
              this.load();
              alert('play:' + this.playCounter);
         } else {
           this.reset();
           this.next();
         }
      } else {
         if(this.playCounter == this.payload.length - 1) {
           alert('2')
           this.reset();
           this.load();
           this.music.play();
         } else {
           this.reset();
           this.next();
         }
      }

     
 })
  }

}
