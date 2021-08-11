import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserConfigService } from 'src/app/Services/user-config.service';
import { user } from 'src/app/_model/user';
import { MusicService } from './music.service';
import { Music } from 'src/app/_model/music';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { state } from '@angular/animations';
// import { Observable } from 'rxjs';
// import { Resolve } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  baseURL = "http://localhost:8000/api/musics/" ;
  public searchQuery: string ="" ;
   musics: Music[] = [];
  allSearch: any= [];
  //  Musics =[
  //    "ghada" , "amira" ,"ali"

  // ]
isShown:boolean=false;
  constructor(private http:HttpClient, private musicService : MusicService ,private userset:UserConfigService) { }
//  resolve(route: ActivatedRouteSnapshot  state:RouterStateSnapshot): Observable<Music[]>{
//    return this.musicService. getAllSearch();
//  }
  userGet:any = [];
  ngOnInit(): void {
    this.userset.getUser().subscribe((res: user[])=>{
      this.userGet = res;
   });
   this.getAllSearch();
  }
getAllSearch(){
  return this.musicService.getAllSearch(this.searchQuery).subscribe((res: any)=> {
     console.log(res);
     this.allSearch = res ;
  })
}
toggleShow(){
  this.isShown =!this.isShown;
  
}

  }


