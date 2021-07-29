import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserConfigService } from 'src/app/Services/user-config.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private http:HttpClient,private userData:UserConfigService) { }
  User:any = this.userData.setUser();
  ngOnInit(): void {
    const User:any = localStorage.getItem('User');
    const userObj = JSON.parse(User);
    const token = userObj.token;
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    this.http.post('http://localhost:8000/api/snip',null,{headers: headers}).subscribe((res)=>{
      console.log('res');
    });
    console.log(this.User);
  }

}
