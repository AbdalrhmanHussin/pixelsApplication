import { Component, OnInit } from '@angular/core';
import { WriteService } from 'src/app/Services/write.service';

@Component({
  selector: 'app-playing',
  templateUrl: './playing.component.html',
  styleUrls: ['./playing.component.css']
})
export class PlayingComponent implements OnInit {
  getPlaylistAction(index:number = 0) {
    let data = {
      'playingType': 'music',
    }
    localStorage.setItem('playingType',JSON.stringify(data));
    this.transferePlaylist(this.musicInRow,index);
  }

  transferePlaylist(playlist:any,playCounter:number = 0) {
    this.write.playlist.next({playlist,playCounter});
  }
  constructor(private write:WriteService) { }
  name:string = 'Not Set';
  img:string  = "../../../../assets/images/noimg.jfif";
  band:string = 'Not Set';
  musicInRow:any;
  playlistArray:[] = [];
  playJson:any = [];
  playListCount:number = 0;
  
  ngOnInit(): void {
     //init the page in playlist
     $('.tb-page').css({
      'margin': 0,
      'padding': 0,
      'max-width': '100%',
      'width': '100%',
      'margin-top': 0
    });
    this.write.playlistPayload.subscribe((res)=>{
      console.log(res);
      this.musicInRow = res;
      this.playListCount = this.musicInRow.length;
      this.playJson = [];
      this.musicInRow.forEach((element:any) => {
         let chunk = {
            'src': element[0],
            'name': element[1],
            'band': element[2],
            'img' : element[3],
            'id'  : element[4]
         }
         console.log(this.playJson);

         this.playJson.push(chunk);
         
      });
      console.log(this.musicInRow);
    });
    this.write.loadedMusic.subscribe((res)=>{
       this.name = res[1];
       this.img  = res[3];
       this.band = res[2];
    })
  }

}
