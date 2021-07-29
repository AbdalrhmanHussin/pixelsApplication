import { Routes } from '@angular/router';
import { BrowseComponent } from './Public/pages/browse/browse.component';
import { ChartsComponent } from './Public/pages/charts/charts.component';
import { HomeComponent } from './Public/pages/home/home.component';
import { NewreleaseComponent } from './Public/pages/newrelease/newrelease.component';
import { PagesComponent } from './Public/pages/pages.component';
import { LoginComponent } from './Public/users/login/login.component';

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children: [
      {
      path: '',
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

  ]
  },
  { path: 'login', component: LoginComponent },
];

export default routes;


