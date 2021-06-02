import { Component, OnInit } from '@angular/core';
import {AuthenticationService, TokenPayload, UserDetails} from '../authentication.service'
import { CoachService, coachData } from "../coach.service";
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-coach-edit',
  templateUrl: './coach-edit.component.html',
  styleUrls: ['./coach-edit.component.css']
})
export class CoachEditComponent implements OnInit {
  details: coachData;
  constructor(private auth: AuthenticationService, private auth2: CoachService, private actRoute: ActivatedRoute, private router: Router) { }

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

  editCoach() {
    this.auth2.editPro(this.details).subscribe(
      () => {
        this.router.navigateByUrl('/coachlist')
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
