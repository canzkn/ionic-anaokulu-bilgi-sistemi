import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrivateGuard } from './services/guards/private.guard'
import { PublicGuard } from './services/guards/public.guard'

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', canActivate: [PublicGuard], loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'login', canActivate: [PublicGuard], loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', canActivate: [PublicGuard], loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'dashboard/home', canActivate: [PrivateGuard], loadChildren: './home/home.module#HomePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
