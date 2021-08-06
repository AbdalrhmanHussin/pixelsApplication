import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { playlistData } from '../_model/playlist-data';


@Injectable({
  providedIn: 'root'
})
export class WriteService { 
  public playlist: BehaviorSubject<any>           = new BehaviorSubject<any>(null);
  public playCounterActive: BehaviorSubject<any>  = new BehaviorSubject<any>(null);
  public deleteFromList: BehaviorSubject<any>     = new BehaviorSubject<any>(null);
  public playlistDisplayImg: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public payloadExport:BehaviorSubject<any>       = new BehaviorSubject<any>(null)

  constructor(private http:HttpClient) { }
}
