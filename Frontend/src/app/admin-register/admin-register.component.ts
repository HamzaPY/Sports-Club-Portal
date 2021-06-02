import { Component, OnInit } from '@angular/core';
import {AuthenticationService, adminDetails, PayloadAdmin} from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  credentials: adminDetails = {
    _id:'',
    name: '',
    role: "Admin",
    email: '',
    password: '',
    isAvailable: true
  };

  constructor(private auth: AuthenticationService, private router: Router) {
  }
  
  ngOnInit(): void {
  }

  register() {
    this.credentials.role = "Admin"
    this.credentials.isAvailable = true
    this.auth.adminRegister(this.credentials).subscribe(
      (response) => {
        this.router.navigateByUrl('/superAdmin')
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
