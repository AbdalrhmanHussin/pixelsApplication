import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserConfigService } from 'src/app/Services/user-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail:any;
  loginData:{} = {};
  constructor(private http:HttpClient,private router:Router,private userData:UserConfigService) { }

  ngOnInit(): void {
  
  }
  onSubmit(form: NgForm) {
      let data = {
        'email': form.value.email,
        'password': form.value.password
      }
      this.http.post('http://127.0.0.1:8000/api/login',data).subscribe((res:any)=>{
           console.log(res.login);
          if(res.login == 'success') {
              let user = {
                'user': res.User,
                'token': res.token
              }
              localStorage.setItem('User',JSON.stringify(user));
              
              this.router.navigate(['/']);
          } else {
              this.loginFail = 'Wrong Credentials';
          }
      },(err)=>{
          console.log(err);
      });
  }

}