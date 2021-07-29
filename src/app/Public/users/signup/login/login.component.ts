import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFail:any;
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
      let data = {
        'email': form.value.email,
        'password': form.value.password
      }
      this.http.post('http://127.0.0.1:8000/api/login',data).subscribe((res:any)=>{
           console.log(res.login);
          // localStorage.setItem('user',JSON.stringify(res.))
          if(res.login == 'success') {
              localStorage.setItem('user',JSON.stringify(res.User));
              localStorage.setItem('token',JSON.stringify(res.token));
              this.router.navigate(['/']);
          } else {
              this.loginFail = 'Wrong Credentials';
          }
      });
  }

}
