import { Component, OnInit } from '@angular/core';
import {
  PlayerProfileService,
  UserData
} from "../player-profile.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-match-schedule',
  templateUrl: './match-schedule.component.html',
  styleUrls: ['./match-schedule.component.css']
})
export class MatchScheduleComponent implements OnInit {
  details: UserData;
  // @ts-ignore
  currentDate: Date = new Date;
  constructor(private auth: PlayerProfileService, private router: Router) { }

  ngOnInit(): void {
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

  calculateTime(t1): number
  {
    // @ts-ignore
    let difference = Math.round((this.currentDate.getTime() - (new Date(t1)).getTime())/86400000); //difference in days
    return Math.abs(difference);
  }

  calculate_duration(t1, t2): any
  {
    // @ts-ignore
    return Math.abs(Math.round(((new Date(t1)).getTime() - (new Date(t2).getTime()))/60000));
  }

}
