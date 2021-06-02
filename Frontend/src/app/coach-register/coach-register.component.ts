import { Component, OnInit } from '@angular/core';
import {AuthenticationService, PayloadAdmin} from '../authentication.service'
import { Router } from '@angular/router'
import {coachData} from "../coach.service";

@Component({
  selector: 'app-coach-register',
  templateUrl: './coach-register.component.html',
  styleUrls: ['./coach-register.component.css']
})
export class CoachRegisterComponent implements OnInit {
  credentials: coachData = {
    _id:'',
    name: '',
    role: "Coach",
    email: '',
    password: '',
    isAvailable: true
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  register() {
    //alert("register")
    this.credentials.role = "Coach";
    this.credentials.isAvailable = true;
    this.auth.coachRegister(this.credentials).subscribe(
      (response) => {
        this.router.navigateByUrl('/admin')
        //alert(response.status)
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
