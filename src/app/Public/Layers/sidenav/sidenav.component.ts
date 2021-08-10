import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WriteService } from 'src/app/Services/write.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  playlistID:number = 35;
  constructor(private write:WriteService,private router:Router) { }
  token:any = localStorage.getItem('User') ?? null;

  logout() {
    localStorage.removeItem('User');
    window.location.reload()
  }

  playDirectory() {
   this.write.playingMode.subscribe((res)=>{
      if(res !== null)
         console.log(res);
         if(res.playlist !== null) {
          this.router.navigate([`playlist/${res.playlist}`]);
         }   
      if (res == null || res.playlist == null)
        this.router.navigate(['playing']);
   })
  }

  ngOnInit(): void {
     
  }


}
