import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Music } from '../_model/music';
import { NumberValueAccessor } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadConfigService {

  public musictrack: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  Popular:Object = [
    {id: 1, name:'Hey Boy', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-49.png"},
    {id: 2, name:'Natural', band:'Imagine the dragon', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-45.png"},
    {id: 3, name:'Diamound', band:'Rihanna', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-44.png"},
    {id: 4, name:'Bring me to life', band:'Evenscence', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-43.png"},
    {id: 5, name:'Helium ', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-42.png"},
    {id: 6, name:'Move your body', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-24.png"},
  ];
  New:Object = [
    {id: 1, name:'Hey Boy', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-50.png"},
    {id: 2, name:'Natural', band:'Imagine the dragon', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-46.png"},
    {id: 3, name:'Diamound', band:'Rihanna', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-45.png"},
    {id: 4, name:'Bring me to life', band:'Evenscence', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-42.png"},
    {id: 5, name:'Helium ', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-41.png"},
    {id: 6, name:'Move your body', band:'Sia', img: "http://music.flatfull.com/waveme/wp-content/uploads/sites/2/2020/09/Artboard-21.png"},
  ];
  
  private Url='http://127.0.0.1:8000/api/';
  constructor(private http:HttpClient) {}
  
  
  getalltracks(limit: number): Observable<Music[]> {
    return this.http.get<Music[]>(this.Url + 'bundle/popularity/' + limit);
  }

  // get track by id
  gettrackeByID(id:number): Observable<{message:string,music:Music}> {
    return this.http.get<{message:string,music:Music}>(`${this.Url}show/${id}`);
  }

}
