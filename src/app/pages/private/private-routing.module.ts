import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivatePage } from './private.page';
import { PrivateGuard } from '../../guards/private/private.guard'

const routes: Routes = [
  {
    path: 'dashboard',
    component: PrivatePage,
    canActivate: [PrivateGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePageRoutingModule {}
