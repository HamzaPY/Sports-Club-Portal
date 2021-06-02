import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload, UserDetails} from '../authentication.service'
import { PlayerProfileService, UserData } from "../player-profile.service";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  details: UserData
  constructor(private auth: AuthenticationService, private auth2: PlayerProfileService, private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.auth2.profileById(id).subscribe(
      user => {
        this.details = user
      },
      err => {
        console.error(err)
      }
    )
  }

  editPlayer() {
    this.auth2.editPro(this.details).subscribe(
      () => {
        this.router.navigateByUrl('/playerlist')
      },
      err => {
        console.error(err)
      }
    )
  }

  logout() {

    this.auth.logout();
    this.router.navigateByUrl('/home')
  }


}
