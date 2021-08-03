import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WriteService {

  constructor(private http:HttpClient) { }

  addSongToPlaylist() {
    let sanctum = localStorage.getItem('User');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`,
      Accept: 'application/json'
    });
    
    this.http.post('127.0.0.1:8000/api/playlist/add?playlistID=1&musicID=11',{},{headers: headers});
  }
}
