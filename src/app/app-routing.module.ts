import { Routes } from '@angular/router';
import { BrowseComponent } from './Public/pages/browse/browse.component';
import { ChartsComponent } from './Public/pages/charts/charts.component';
import { HomeComponent } from './Public/pages/home/home.component';
import { NewreleaseComponent } from './Public/pages/newrelease/newrelease.component';
import { NotFoundComponent } from './Public/pages/not-found/not-found.component';
import { PagesComponent } from './Public/pages/pages.component';
import { PlaylistComponent } from './Public/pages/playlist/playlist.component';
import { ProfileComponent } from './Public/pages/profile/profile.component';
import { LoginComponent } from './Public/users/login/login.component';
import { SignupComponent } from './Public/users/signup/signup.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      {
      path: 'home',
      component: HomeComponent
      },
      {
        path: 'browse',
        component: BrowseComponent
      },
      {
        path: 'newrel',
        component: NewreleaseComponent
      },
      {
        path: 'charts',
        component: ChartsComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
  ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'playlist', component: PlaylistComponent },
  { path: '**', component: NotFoundComponent  }
];

export default routes;


