import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicPage } from './public.page';
import { PublicGuard } from '../../guards/public/public.guard'

const routes: Routes = [
  {
    path: '',
    component: PublicPage,
    canActivate: [PublicGuard],
    children: [
      {
        path: '',
        redirectTo: 'welcome',
        pathMatch: 'full'
      },
      {
        path: 'welcome',
        loadChildren: './welcome/welcome.module#WelcomePageModule'
      },
      {
        path: 'login',
        loadChildren: './login/login.module#LoginPageModule'
      },
      {
        path: 'signup',
        loadChildren: './signup/signup.module#SignupPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPageRoutingModule {}
