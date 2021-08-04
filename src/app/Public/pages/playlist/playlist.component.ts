import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ReadConfigService
} from 'src/app/Services/read-config.service';
import { playlist } from 'src/app/_model/playlist';
import { WriteService } from 'src/app/Services/write.service';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(public read:ReadConfigService,private route:ActivatedRoute,private router:Router,private http:HttpClient,public write:WriteService) {}
  
  selectedId: number = 0;
  
  id:any;

  playlistData:any;

  playlistArray:[] = [];

  playlistMusicCount:any;
  
  getPlaylistAction() {
    this.transferePlaylist(this.playlistArray);
  }

  transferePlaylist(playlist:any) {
    this.write.playlist.next(playlist);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    let id  = +this.id;
    if(!isNaN(this.id)) 
       this.read.getPlaylistMusics(this.id).subscribe(res => {
          let playArray:any = [];
          let playlist:any  = res[0];
          this.playlistData = playlist[0];
          this.playlistMusicCount = this.playlistData.musics.length;
          this.playlistData.musics.forEach((element:any) => {
              let chunk = [element.src,element.name,element.band,element.img]
              playArray.push(chunk);
              this.playlistArray = playArray;
          });
       })  
    ;else
       this.router.navigateByUrl('notfound');
  }

}
