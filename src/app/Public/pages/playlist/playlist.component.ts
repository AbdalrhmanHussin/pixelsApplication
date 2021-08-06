import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router,NavigationEnd } from '@angular/router';
import {
  ReadConfigService
} from 'src/app/Services/read-config.service';
import { playlist } from 'src/app/_model/playlist';
import { WriteService } from 'src/app/Services/write.service';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(public read:ReadConfigService,private route:ActivatedRoute,private router:Router,private activeRouter:ActivatedRoute,private http:HttpClient,public write:WriteService) {}
  
  selectedId: number = 0;
  
  id:any;

  playlistData:any = {
    'musics': [
      {img:'',id: 0}

    ]
  };

  playlistArray:[] = [];

  playlistMusicCount:any;

  playingPlaylist:boolean = false;

  playlistPage:boolean = true;

  playlistID:number    = 0;

  jsonStatus = JSON.parse(localStorage.getItem('playingType') || '{}');
  
  getPlaylistAction(index:number = 0) {
    let data = {
      'playingType': 'playlist',
      'id'         :  this.id
    }
    localStorage.setItem('playingType',JSON.stringify(data))
    this.transferePlaylist(this.playlistArray,index);
  }

  transferePlaylist(playlist:any,playCounter:number = 0) {
    this.write.playlist.next({playlist,playCounter});
  }
  
  getActiveList() {
    this.write.playCounterActive.subscribe(res => {
      $('.song-list').removeClass('active');
      $('.song-list').eq(res).addClass('active');
     });
  }

  removeFromPayload(id:any) {
    this.write.deleteFromList.next(id);
  }
  playlistRemove(id:any,div:HTMLElement) {
    let playlist = this.playlistID;
    let sanctum  = localStorage.getItem('User');
    let headers  = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    }); 
    this.http.post(`http://127.0.0.1:8000/api/playlist/add?playlistID=${playlist}&musicID=${id}`,{},{headers: headers}).subscribe((res)=>{
      div.remove();
    });
  };

  ngOnInit(): void {
    //init the page in playlist
    if(this.playlistPage) {
      $('.tb-page').css({
        'margin': 0,
        'padding': 0,
        'max-width': '100%',
        'width': '100%',
        'margin-top': 0
      });
    }
    this.route.params.subscribe(params => {  
      this.id = params['id'];
      if(!isNaN(this.id)) {
        if( this.id == this.jsonStatus.id) {
          this.getActiveList()
        }
        this.router.events.pipe(
          filter((event) => event instanceof NavigationEnd)
        ).subscribe(x => {
           this.getActiveList();
        })

        this.read.getPlaylistMusics(this.id).subscribe(res => {
          let playArray:any = [];
          let playlist:any  = res[0];
          this.playlistID   = playlist[0].id;
          this.playlistData = playlist[0];
          console.log(this.playlistID);
          this.playlistMusicCount = this.playlistData.musics.length;
          this.playlistData.musics.forEach((element:any) => {
              console.log(element);
              let chunk = [element.src,element.name,element.band,element.img,element.id]
              playArray.push(chunk);
              this.playlistArray = playArray;
          });
      });

      } else {
        this.router.navigateByUrl('notfound');
      }
    });

  }

}
