import { Component } from '@angular/core';
import { UserConfigService } from './Services/user-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'pixelsApp';
  constructor(private user:UserConfigService){

  }
  ngOnInit(): void {
    //  this.user.snipToken();
    //  console.log(this.user.getUser())
  }
}
