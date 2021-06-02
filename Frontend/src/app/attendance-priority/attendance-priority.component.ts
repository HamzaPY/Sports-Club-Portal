import { Component, OnInit } from '@angular/core';
import {PlayerProfileService, UserData, Attendance, gamePriority, game} from "../player-profile.service";
import {formatDate } from '@angular/common';
import { Router } from "@angular/router";
@Component({
  selector: 'app-attendance-priority',
  templateUrl: './attendance-priority.component.html',
  styleUrls: ['./attendance-priority.component.css']
})
export class AttendancePriorityComponent implements OnInit {
  details: UserData;
  game: game = {
    gameType : '',
    priority : 0,
    Duration : 0
  };
  currentDate = new Date()
  newAttendance: Attendance = {
  checkIn : this.currentDate,
  gamePriority:[this.game]
};
  priority: gamePriority = {
    gamePriority : [this.game]
  };
  allGames: Array<string> = [];
  remainingGames: Array<string> = [];
  isAttendanceMarked: boolean = false;

  constructor(private auth: PlayerProfileService, private router: Router) {

  }

  ngOnInit(): void {
    this.auth.profile().subscribe(
      user => {
        console.log(user.name);
        this.details = user;
      },
      err => {
        console.error(err)
      }
    );

  }
  fillArrays()
  {
    let games = this.details.game;
    for( let i = 0; i < games.length; i++)
    {
      this.remainingGames.push(games[i].gameType);
    }
    this.allGames = this.remainingGames;
  }
 markAttendance() {
   this.fillArrays();
   console.log(this.details);
   this.isAttendanceMarked = true;
   this.priority.gamePriority.pop();
   for (let i = 0; i < this.allGames.length; i++)
   {
     let games: game = new class implements game {
       Duration: 0;
       gameType: '';
       priority: 0;
     }
     games.gameType = this.allGames[i];
     this.priority.gamePriority.push(games);

   }
   this.newAttendance.gamePriority = this.priority.gamePriority;
   this.details.isPresent = true;

 }
 saveData()
 {
  this.details.isPresent = true;
  this.details.attendance.push(this.newAttendance);
   console.log(this.details);

  this.auth.attendance(this.details).subscribe(
    () => {
      //alert("Attendance Marked")
      this.router.navigateByUrl('/dashboard')
    },
    err => {
      //console.log("What The Hell")
    }
  )
   this.router.navigateByUrl('/dashboard')
 }


}
