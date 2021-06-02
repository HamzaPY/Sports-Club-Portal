import { Component, OnInit } from '@angular/core';
import {PlayerProfileService, UserData} from "../player-profile.service";
import { AuthenticationService} from '../authentication.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {

  Employee:any = [];

  constructor(private auth: PlayerProfileService, private auth2: AuthenticationService, private router: Router) {
    this.readEmployee();
  }

  ngOnInit() {}

  readEmployee(){
    this.auth.getPlayers().subscribe(
      user => {
        console.log(this.Employee)
        this.Employee = user
      },
      err => {
        console.error(err)
      }
    )
  }

  removePlayer(player, index) 
  {
    if(window.confirm('Are you sure?')) {
      this.auth.deletePlayer(player._id).subscribe((data) => {
        this.Employee.splice(index, 1);
      }
    )
    window.location.reload();
    }
  }

  logout() {

    this.auth2.logout();
    this.router.navigateByUrl('/home')
  }

}
