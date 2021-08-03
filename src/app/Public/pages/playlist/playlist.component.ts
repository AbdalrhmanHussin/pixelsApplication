import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  ReadConfigService
} from 'src/app/Services/read-config.service';
import { playlist } from 'src/app/_model/playlist';



@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(public read:ReadConfigService,private route:ActivatedRoute,private router:Router,private http:HttpClient) {}
  
  selectedId: number = 0;
  
  id:any;

  playlistData:any;

  playlistMusicCount:any;
  

  ngOnInit(): void {
  
    this.id = this.route.snapshot.paramMap.get('id');
    let id  = +this.id;
    if(!isNaN(this.id)) 
       this.read.getPlaylistMusics(this.id).subscribe(res => {
          let playlist:any  = res[0];
          this.playlistData = playlist[0];
          this.playlistMusicCount = this.playlistData.musics.length;
          console.log(this.playlistData);
       })  
    ;else
       this.router.navigateByUrl('notfound');
  }

}
