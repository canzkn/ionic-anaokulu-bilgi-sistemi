import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { AuthService } from '../../../services/auth/auth.service';
import { SQLService } from '../../../services/sql/sql.service';
import { StudentService } from '../../../services/student/student.service';
import { ParentService } from '../../../services/parent/parent.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formData = {
    StudentID : '',
    StudentName : '',
    StudentPassword : '',
    StudentPasswordAgain : '',
    StudentBirthday: '0000-00-00',
    StudentSize: '0',
    StudentKilo: '0',
    StudentPicture: 'uploads/default.jpg',
    StudentClass: 'Tanımsız',
  }

  constructor(
    private router: Router, 
    private toastService: ToastService, 
    private auth: AuthService,
    private sqlService: SQLService,
    private studentService: StudentService,
    private parentService: ParentService
    ) { }

  ngOnInit() {
  }

  // boşluk kontrolü
  checkFields(): boolean
  {
    let StudentID = this.formData.StudentID;
    let StudentName = this.formData.StudentName.trim();
    let StudentPassword = this.formData.StudentPassword.trim();
    let StudentPasswordAgain = this.formData.StudentPasswordAgain.trim();

    // boş input kontrolü
    if(StudentID === "" || StudentName === "" || StudentPassword === "" || StudentPasswordAgain === "")
    {
      this.toastService.error("Boş Alan Bırakmayınız");
      return false;
    }
    // şifreler uyuşuyor mu?
    if(StudentPassword !== StudentPasswordAgain)
    {
      this.toastService.error("Şifreler uyuşmuyor.");
      return false;
    }
    
    return true;
  }

  signup()
  {
    if(this.checkFields())
    {
      this.auth.signup(this.formData).subscribe(
        (res: any) => 
        {
          if(res.message == 'USER_AVAILABLE_IN_DB')
          {
            this.toastService.error("Girdiğiniz kullanıcı sistemimizde mevcuttur");
          }
          
          if(res.message == 'DO_NOT_LEAVE_IN_BLANK')
          {
            this.toastService.warning("Boş alan bırakmayınız");
          }

          if(res.message == 'USER_CREATE_SUCCESS')
          {
            this.toastService.success("Üye kayıt işlemi başarılı!");
            this.studentService.addStudentDB(this.formData)
            this.parentService.addParentDB(this.formData)
            this.router.navigate(['login'])
          }
          
          if(res.message == 'USER_CREATE_FAILED')
          {
            this.toastService.error("İşlem başarısız!");
          }
        }
      )
    }
  }

  codeInput(event) 
  {
    //48 - 57
    let pass = /[4][8-9]{1}/.test(event.charCode) || /[5][0-7]{1}/.test(event.charCode);
    if (!pass) {
      return false;
    }
  }

  

}
