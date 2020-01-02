import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrivateGuard } from './services/guards/private.guard'
import { PublicGuard } from './services/guards/public.guard'
import { UserdataService } from './services/resolver/userdata.service';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', canActivate: [PublicGuard], loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: 'login', canActivate: [PublicGuard], loadChildren: './login/login.module#LoginPageModule' },
  { path: 'signup', canActivate: [PublicGuard], loadChildren: './signup/signup.module#SignupPageModule' },
  { 
    path: 'dashboard', 
    canActivate: [PrivateGuard], 
    resolve: {userData: UserdataService},
    children: [
      { path: '', redirectTo: 'dashboard/home', pathMatch: 'full' },
      { path: 'home', loadChildren: './home/home.module#HomePageModule'},
      { path: 'conversations', loadChildren: './conversations/conversation.module#ConversationModule'},
      { path: 'student', loadChildren: './student/student.module#StudentModule'},
      { path: 'parent', loadChildren: './parent/parent.module#ParentModule'},
      { path: 'activities', loadChildren: './activities/activity.module#ActivityModule'},
      { path: 'teachers', loadChildren: './teachers/teachers.module#TeachersModule'},
      { path: 'reports', loadChildren: './reports/reports.module#ReportsModule'},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
