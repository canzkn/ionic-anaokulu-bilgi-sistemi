import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { TeachersService } from '../../../services/teachers/teachers.service';
import { Teacher } from '../../../models/teacher.model';
import { AlertController } from '@ionic/angular';
import { ConstantService } from '../../../services/constant/constant.service';
@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {

  teachers: Teacher[] = [];
  textFilter = '';

  public api_url: any;

  constructor(
    private auth: AuthService,
    private teacherService: TeachersService,
    private alertController: AlertController,
    private constantService: ConstantService
  ) { 

    this.api_url = this.constantService.API_URL;
  }

  ngOnInit() {
    this.getTeachers()
  }

  // get teachers
  getTeachers()
  {
    this.auth.userData$.subscribe(logged => {
      this.teacherService.getTeachersCloud(logged).subscribe(
        resp => {
          if(resp.length > 0)
          {
            this.teacherService.clearTeacherInDB()
            for(var i=0; i < resp.length; i++)
            {
              //add database
              this.teacherService.addTeacherToDB(resp[i])
            }
          }
        }
      )
    })

    this.teacherService.getTeachers().subscribe(data => 
    {
      this.teachers = data;
    })
  }

  filterText( event )
  {
    const text = event.target.value;
    this.textFilter = text;
  }

  fav( teacher_id , flag)
  {
    let postdata = {
      TeacherID : teacher_id,
      favorite: flag
    };

    this.auth.userData$.subscribe(logged => {
      this.teacherService.updateFavoriteCLOUD(logged, postdata).subscribe(
        resp => {
          this.getTeachers()
        }
      )
    })
  }

  async unfav(id)
  {
    const alert = await this.alertController.create({
      header: 'Dikkat!',
      message: 'Bu öğretmeni favorilerden çıkarmak mı istiyorsunuz?',
      buttons: [
        {
          text: 'Hayır',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Evet',
          cssClass: 'danger',
          handler: () => {

            this.fav(id, 0)
            
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.getTeachers()
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
