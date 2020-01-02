import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { ActivityService } from '../activities/services/activity.service';
import { Activity } from '../activities/model/activity.model';
import { Teacher } from '../teachers/model/teacher.model';
import { PopoverController } from '@ionic/angular';
import { ActivityDetailPage } from '../activities/activity-detail/activity-detail.page';
import { ConstantService } from '../services/constant/constant.service';
import { TeachersService } from '../teachers/services/teachers.service';

import { Conversation } from '../conversations/model/conversation.model';
import { ConversationService } from '../conversations/services/conversation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public api_url: any;
  public authUser: any;
  activities: Activity[] = [];
  teachers: Teacher[] = [];
  conversations: Conversation[] = [];

  constructor(
    private auth: AuthService,
    private activityService: ActivityService,
    private popoverController: PopoverController,
    private constantService: ConstantService,
    private teacherService: TeachersService,
    private conversationService: ConversationService,
    private router: Router,
  ) {
    this.api_url = this.constantService.API_URL;
   }

   ngOnInit() {

    this.auth.userData$.subscribe((res:any) => {
      this.authUser = res;
      this.activityService.loadFavorites()
      this.teacherService.loadFavorites()

      this.conversationService.getConversationApi(res).subscribe(
        resp => {
          this.conversationService.ReceiverID = res.username
          this.conversationService.clearConversationDB()
          if(resp.length > 0)
          {
            for(var i=0; i < resp.length; i++)
            {
              //add database
              this.conversationService.addConversationDB(resp[i])
            }
          }
        }
      )

      this.conversationService.getConversations().subscribe(data => 
      {
        this.conversations = data;
      })
    })

    this.activityService.getFavorites().subscribe(data => 
    {
      this.activities = data;
    })

    this.teacherService.getFavorites().subscribe(data => 
      {
        this.teachers = data;
      })
  }

  chooseConversation(selectedVal)
  {
    this.router.navigate(['dashboard/message', selectedVal])
  }

  logout()
  {
    this.auth.logout()
  }

  async activityDetail(ev: Event, detail)
  {
    const popover = await this.popoverController.create({
      
      component: ActivityDetailPage,
      componentProps: {
        passed_data: detail
      },
      event: ev,
    });

    popover.present();
  }

}
