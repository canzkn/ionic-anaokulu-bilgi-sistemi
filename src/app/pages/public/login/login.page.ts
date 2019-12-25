import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ConstantService } from '../../../services/constant/constant.service';

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

  constructor(
    private router: Router, 
    private toastService: ToastService, 
    private auth: AuthService,
    private storageService: StorageService,
    private constantService: ConstantService
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
            this.storageService.setData(this.constantService.AUTH, res)
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
