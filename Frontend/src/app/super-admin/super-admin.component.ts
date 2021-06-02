import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {

    this.auth.logout();
    this.router.navigateByUrl('/home')
  }

}
