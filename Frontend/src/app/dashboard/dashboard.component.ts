import { Component, OnInit } from '@angular/core';
import {
  PlayerProfileService,
  UserData
} from "../player-profile.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  details: UserData;
  constructor(private auth: PlayerProfileService) {

  }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        //console.log(user.name);
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

}
