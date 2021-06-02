import { Component, OnInit } from '@angular/core';
import {CoachService, coachData} from "../coach.service";
import { AuthenticationService} from '../authentication.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-coach-list',
  templateUrl: './coach-list.component.html',
  styleUrls: ['./coach-list.component.css']
})
export class CoachListComponent implements OnInit {

  Employee:any = [];

  constructor(private auth: CoachService, private auth2: AuthenticationService, private router: Router) {
    this.readCoach();
  }

  ngOnInit() {}

  readCoach(){
    this.auth.getCoaches().subscribe(
      user => {
        this.Employee = user
      },
      err => {
        console.error(err)
      }
    )
  }

  logout() {

    this.auth2.logoutCoach();
    this.router.navigateByUrl('/home')
  }

  removeCoach(coach, index) {
    if(window.confirm('Are you sure?')) {
        this.auth.deleteCoach(coach._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )
      window.location.reload();
    }
  }

}
