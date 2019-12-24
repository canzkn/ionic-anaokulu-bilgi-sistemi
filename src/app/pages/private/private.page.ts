import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {
  
  public appPages = [
    {
      title: 'Anasayfa',
      url: '/dashboard/home',
      icon: 'home'
    },
    {
      title: 'Profil',
      url: '/dashboard/profile',
      icon: 'person'
    },
    {
      title: 'Duyuru',
      url: '/dashboard/announce',
      icon: 'notifications'
    },
    {
      title: 'Etkinlik',
      url: '/dashboard/activity',
      icon: 'megaphone'
    },
    {
      title: 'Ödev',
      url: '/dashboard/homework',
      icon: 'print'
    },
    {
      title: 'Ders Programı',
      url: '/dashboard/syllabus',
      icon: 'calendar'
    },
    {
      title: 'Yemek Listesi',
      url: '/dashboard/foodlist',
      icon: 'restaurant'
    },
    {
      title: 'Öğretmenlerim',
      url: '/dashboard/myteacher',
      icon: 'contacts'
    }
    ,
    {
      title: 'Çıkış Yap',
      url: '/dashboard/logout',
      icon: 'log-out'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
