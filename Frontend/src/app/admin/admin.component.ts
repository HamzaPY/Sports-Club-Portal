import { Component, OnInit } from '@angular/core';
import {AdminService, adminData} from "../admin.service";
import { Router } from '@angular/router'
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  details: adminData;
  constructor(private auth: AuthenticationService, private admin:AdminService,private router: Router) { }

  ngOnInit(): void {
    this.admin.profile().subscribe(
      user => {
        //console.log(user.name);
        this.details = user;

      },
      err => {
        console.error(err)
      }
    )
  }
  logout() {

    this.auth.logoutAdmin();
    this.router.navigateByUrl('/home')
  }

}
