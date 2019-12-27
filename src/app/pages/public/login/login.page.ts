import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ConstantService } from '../../../services/constant/constant.service';
import { StudentService } from '../../../services/student/student.service';
import { ParentService } from '../../../services/parent/parent.service';
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
    private studentService: StudentService,
    private parentService: ParentService,
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
                console.log("öğrenci yok")
                this.studentService.getStudent(res.data).subscribe(
                  data => {
                    console.log(data);
                    this.studentService.addStudentDB(data)
                  
                    this.parentService.isParentInDB(this.formData.StudentID).then(parentData => {
                      if(parentData.result === 0)
                      {
                        console.log("veli yok")
                        this.parentService.getParent(res.data).subscribe(
                          gettedParent => {
                            console.log(gettedParent)
                            this.parentService.addParentDB(gettedParent)
                          }
                        )
                      }
                    })
                  }
                )                
              }
              else
              {
                console.log("öğrenci var")
                this.studentService.getStudent(res.data).subscribe(
                  data => {
                    console.log(data);
                    this.studentService.updateStudentDB(data)
                  }
                )

                this.parentService.getParent(res.data).subscribe(
                  data => {
                    console.log(data)
                    this.parentService.updateParentDB(data)
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
