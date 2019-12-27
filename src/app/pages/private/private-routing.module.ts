import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivatePage } from './private.page';
import { PrivateGuard } from '../../guards/private/private.guard'
import { UserdataService } from '../../services/resolver/userdata.service';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PrivatePage,
    canActivate: [PrivateGuard],
    resolve: {
      userData: UserdataService
    },
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
      ,
      {
        path: 'profile',
        loadChildren: './profile/profile.module#ProfilePageModule'
      },
      {
        path: 'parent',
        loadChildren: './parent/parent.module#ParentPageModule'
      },
      {
        path: 'messages',
        loadChildren: './messages/messages.module#MessagesPageModule'
      },
      {
        path: 'activity',
        loadChildren: './activity/activity.module#ActivityPageModule'
      },
      {
        path: 'endofday',
        loadChildren: './endofday/endofday.module#EndofdayPageModule'
      },
      {
        path: 'teachers',
        loadChildren: './teachers/teachers.module#TeachersPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivatePageRoutingModule { }
