import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import { Router } from '@angular/router'

@Component({
  selector: 'app-player-header',
  templateUrl: './player-header.component.html',
  styleUrls: ['./player-header.component.css']
})
export class PlayerHeaderComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  logout() {

    this.auth.logout();
    this.router.navigateByUrl('/login')
  }
}
