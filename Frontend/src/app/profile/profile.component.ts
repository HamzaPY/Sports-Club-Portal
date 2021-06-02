import { Component } from '@angular/core'
import {
  PlayerProfileService,
  UserData
} from "../player-profile.service";
import { Router } from "@angular/router";

@Component({
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  details: UserData;
 // dailyJoiningTime: string = '08:15';
  opponentRank: string= 'Beginner';
  constructor(private auth: PlayerProfileService, private router: Router) {

  }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        //console.log(user.name);
        this.details = user;
        if(!this.details.firstLogin)
        {
          this.router.navigateByUrl('/dashboard');
        }
      },
      err => {
        console.error(err)
      }
    )
  }

  editProfile() {
    this.details.opponentRank = this.opponentRank;
    console.log(this.details);
    this.auth.editPro(this.details).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard')
      },
      err => {
        console.error(err)
      }
    )
  }
}
