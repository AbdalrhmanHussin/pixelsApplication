import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
 
  constructor() { }
  token:any = localStorage.getItem('User') ?? null;
  logout() {
    localStorage.removeItem('User');
    window.location.reload()
  }
  ngOnInit(): void {
    
  }


}
