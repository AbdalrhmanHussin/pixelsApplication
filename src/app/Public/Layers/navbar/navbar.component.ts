import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { user } from 'src/app/_model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private http:HttpClient,private userset:UserConfigService) { }
  userGet:any = [];
  ngOnInit(): void {
    this.userset.getUser().subscribe((res: user[])=>{
      this.userGet = res;
   });
  }

}
