import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast/toast.service';
import { ParentService } from '../services/parent.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  public parentData = {};

  private readOnly = true;

  constructor(
    private toastService: ToastService,
    private parentService: ParentService,
    private auth: AuthService
  ) { }

  ngOnInit() {
    this.parentService.parent.subscribe(
      (_parent) => {
        console.log(_parent)
        if(_parent === null)
        {
          this.parentService.loadParent()
        }
        else
        {
          this.parentData = _parent
        }
      }
    )
  }

  isReadOnly()
  {
    return this.readOnly;
  }

  setReadOnly()
  {
    this.readOnly = false;
  }

  // veli güncelle
  save()
  {   
    this.auth.userData$.subscribe(logged => {
      this.parentService.updateParentOnCloud(logged, this.parentData).subscribe(
        response => {
          console.log(response)
          if(response.message == "UPDATE_SUCCESS")
          {
            this.toastService.success('Veli bilgileri başarı ile güncellendi!')
            this.parentService.updateParentDB(response.updatedData)
            this.readOnly = true;
          }
          else
          {
            this.toastService.error('Güncelleme başarısız!')
          }
        }
      )
    }).unsubscribe()
  }

}
