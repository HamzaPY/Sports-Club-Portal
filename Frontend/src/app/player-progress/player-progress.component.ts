import { Component, OnInit } from '@angular/core';
import {PlayerProfileService, UserData} from "../player-profile.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-player-progress',
  templateUrl: './player-progress.component.html',
  styleUrls: ['./player-progress.component.css']
})
export class PlayerProgressComponent implements OnInit {
  details: UserData;
  constructor(private auth: PlayerProfileService, private router: Router) { }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      user => {
        console.log(user.name);
        this.details = user
      },
      err => {
        console.error(err)
      }
    );
  }

  calculate_duration(t1, t2): any
  {
    // @ts-ignore
    return Math.abs(Math.round(((new Date(t1)).getTime() - (new Date(t2).getTime()))/60000));
  }

}
