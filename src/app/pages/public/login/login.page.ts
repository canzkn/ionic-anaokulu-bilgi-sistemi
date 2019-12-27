import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ConstantService } from '../../../services/constant/constant.service';
import { StudentService } from '../../../services/student/student.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formData = {
    StudentID : '',
    StudentPassword : ''
  }

  row_data: any;

  constructor(
    private router: Router, 
    private toastService: ToastService, 
    private auth: AuthService,
    private storageService: StorageService,
    private constantService: ConstantService,
    private studentService: StudentService
  ) { }

  ngOnInit() {
  }

  // boşluk kontrolü
  checkFields(): boolean
  {
    let StudentID = this.formData.StudentID;
    let StudentPassword = this.formData.StudentPassword.trim();

    // boş input kontrolü
    if(StudentID === "" || StudentPassword === "")
    {
      this.toastService.error("Boş Alan Bırakmayınız");
      return false;
    }
  
    return true;
  }

  login()
  {
    if(this.checkFields())
    {
      this.auth.login(this.formData).subscribe(
        (res: any) => {
          if(res.message == 'LOGIN_SUCCESS')
          {
            this.storageService.setData(this.constantService.AUTH, res.data)

            // sqlite da user var mi yoksa olustur
            this.studentService.isStudentInDB(this.formData.StudentID).then(data => {
              if(data.result === 0)
              {
                console.log("yok")
                this.studentService.getStudent(res.data).subscribe(
                  data => {
                    console.log(data);
                    this.studentService.addStudentDB(data)
                  }
                )
              }
              else
              {
                console.log("var")
                this.studentService.getStudent(res.data).subscribe(
                  data => {
                    console.log(data);
                    this.studentService.updateStudentDB(data)
                  }
                )
              }
            })

            this.router.navigate(['dashboard/home']);
          }
          else
          {
            this.toastService.error('Kullanıcı adı veya Şifre yanlış!')
          }
        }
      )
    }
  }
}
