import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public studentDataDB = {
    StudentID:'',
    StudentName:'',
    StudentBirthday:'',
    StudentSize:'',
    StudentKilo:'',
    StudentPicture: '',
    StudentClass:''
  }

  public appPages = [
    {
      title: 'Anasayfa',
      url: '/dashboard/home',
      icon: 'home'
    },
    {
      title: 'Öğrenci Bilgileri',
      url: '/dashboard/student',
      icon: 'happy'
    },
    {
      title: 'Veli Bilgileri',
      url: '/dashboard/parent',
      icon: 'person'
    },
    {
      title: 'Mesajlar',
      url: '/dashboard/conversations',
      icon: 'mail'
    },
    {
      title: 'Etkinlikler',
      url: '/dashboard/activities',
      icon: 'megaphone'
    },
    {
      title: 'Öğretmenlerim',
      url: '/dashboard/teachers',
      icon: 'contacts'
    },
    {
      title: 'Gün Sonu Raporu',
      url: '/dashboard/reports',
      icon: 'calendar'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loading: LoadingController,
    private auth: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async logout()
  {
    const loading = await this.loading.create({
      message: 'Çıkış yapılıyor...',
      duration: 1000
    });

    loading.present().then(() => {
      this.auth.logout()
    })
  }

  // public sayfa kontrolü
  isWelcomePage(): boolean
  {
    return this.router.url === '/welcome'
  }

  isLoginPage(): boolean
  {
    return this.router.url === '/login'
  }

  isRegisterPage(): boolean
  {
    return this.router.url === '/signup'
  }
}
