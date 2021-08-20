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

  darkMode() {
   
  }
  ngOnInit(): void { 
    if(localStorage.getItem('mode') == 'light') {
    document.body.classList.add('light-theme')
    document.documentElement.style.setProperty('--colorWhite', '#000');
    document.documentElement.style.setProperty('--black', '#ccc');
 } else {
   document.body.classList.remove('light-theme')
   document.documentElement.style.setProperty('--colorWhite', '#fff');
   document.documentElement.style.setProperty('--black', '#101316');
 }   
    console.log(localStorage.getItem('mode') );
    let inverted = document.querySelectorAll('img');
    console.log(inverted);
  
    $('.switch').on('change',function(){
      // console.log(document.body.classList.contains('light-theme'));
      (document.body.classList.contains('light-theme')) ? document.body.classList.remove('light-theme') : document.body.classList.add('light-theme');
      let mode = (document.body.classList.contains('light-theme')) ? localStorage.setItem('mode','light') : localStorage.setItem('mode','dark');
      if(localStorage.getItem('mode') == 'light') {
        document.body.classList.add('light-theme')
        document.documentElement.style.setProperty('--colorWhite', '#000');
        document.documentElement.style.setProperty('--black', '#ccc');
     } else {
       document.body.classList.remove('light-theme')
       document.documentElement.style.setProperty('--colorWhite', '#fff');
       document.documentElement.style.setProperty('--black', '#101316');
     }   
    })
  }


}
