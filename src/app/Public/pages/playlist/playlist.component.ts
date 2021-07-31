import {
  Component,
  OnInit
} from '@angular/core';
import {
  ReadConfigService
} from 'src/app/Services/read-config.service';
import {
  playlist
} from 'src/app/_model/playlist';

import { Music } from 'src/app/_model/music';


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  constructor(public read: ReadConfigService) {}
  id: number = 1;
  alltrackes: any;
  addActive(ele:Element) {
    ele.classList.add('active');
  }
  gettrackeByID(id: number): void {
    this.read.gettrackeByID(id).subscribe((res: {
      message: string,
      music: Music
    }) => {
      if (res.message === 'success') {
        this.read.musictrack.next([
          res.music.src,
          res.music.name,
          res.music.band,
          res.music.img
        ]);
      }
    });
  }
  ngOnInit(): void {
    this.read.getPlaylist(this.id).subscribe((playlist: playlist[]) => {
      this.alltrackes = playlist;
      let array = [];
      for (var i in this.alltrackes) {
        array.push(this.alltrackes[i]);
      }
    });

  }

}
