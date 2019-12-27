import { Component, OnInit } from '@angular/core';
import { SQLService } from '../../../services/sql/sql.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(private sqlService: SQLService) { }

  ngOnInit() {
    this.sqlService.getDbState();
  }

}
