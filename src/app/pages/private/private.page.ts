import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantService } from '../../services/constant/constant.service'
import { Observable } from 'rxjs'
import { Router } from '@angular/router';
import { StudentService } from '../../services/student/student.service'


@Component({
  selector: 'app-private',
  templateUrl: './private.page.html',
  styleUrls: ['./private.page.scss'],
})
export class PrivatePage implements OnInit {

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
      url: '/dashboard/profile',
      icon: 'happy'
    },
    {
      title: 'Veli Bilgileri',
      url: '/dashboard/parent',
      icon: 'person'
    },
    {
      title: 'Mesajlar',
      url: '/dashboard/messages',
      icon: 'mail'
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
  ];

  constructor(
    private auth: AuthService,
    private loading: LoadingController,
    private constantService: ConstantService,
    private http: HttpClient,
    private student: StudentService
    ) { }

  
  ngOnInit()
  {
    this.student.activeStudent.subscribe(
      (_student)=>{
       
        if(_student === null)  
        {
          this.student.loadStudent()
        }else
        {
          this.studentDataDB = _student
        }
        
      }
    )
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
}
