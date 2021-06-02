import { Component, OnInit } from '@angular/core';
import {CoachService, coachData} from "../coach.service";
import {AuthenticationService} from "../authentication.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-coach-dashboard',
  templateUrl: './coach-dashboard.component.html',
  styleUrls: ['./coach-dashboard.component.css']
})
export class CoachDashboardComponent implements OnInit {
  details: coachData;
  constructor(private coach: CoachService, private auth:AuthenticationService,private router: Router) { }

  ngOnInit(): void {
    this.coach.profile().subscribe(
      user => {
        //console.log(user.name);
        this.details = user
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
