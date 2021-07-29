import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  protected $user:{} = [];
  constructor(protected http:HttpClient) { }
  snipToken(token:string) {
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
     this.http.post('http://127.0.0.1:8000/api/snip',{headers: headers}).subscribe((res)=>{
        console.log(res);
     });
  }
  setUser() {
    let email = localStorage.getItem('User');
    let user = {
      'email': email
    }
    
     this.$user = user;
     return email;
  }
  getUser() {
    return this.$user;
  } 
}
