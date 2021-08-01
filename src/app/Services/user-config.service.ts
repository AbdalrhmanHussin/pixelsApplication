import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { user } from '../_model/user';


@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  protected $user:{} = [];
  constructor(protected http:HttpClient) { }
  private userConfig:any;
  getUser(): Observable<user[]> {
    let sanctum = localStorage.getItem('User');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${sanctum}`
    });
     return this.http.post<user[]>('http://localhost:8000/api/snip',null,{headers: headers});
  }
  // snipToken() {
  //   if(localStorage.getItem('User') !== null) {
    
  //     return this.http.post('http://localhost:8000/api/snip',null,{headers: headers})
  //     .subscribe((res)=>{
  //       this.userConfig = res;
  //       console.log('appModule');
  //     });
  //   } else {
  //     return false;
  //   }
  // }
  // async getUser() {
  //    return  this.snipToken();
  // } 
}
