import { Component, OnInit } from '@angular/core';
import {
  PlayerProfileService,
  UserData,
  MatchSchedule,
  Attendance,
  PracticeSchedule
} from "../player-profile.service";
import {FormControl} from "@angular/forms";
import { Router } from "@angular/router";
@Component({
  selector: 'app-custom-opponent-match',
  templateUrl: './custom-opponent-match.component.html',
  styleUrls: ['./custom-opponent-match.component.css']
})
export class CustomOpponentMatchComponent implements OnInit {
  details: UserData;
  oName: string = '';
  opponentPlayer: UserData = new class implements UserData {
    _id: string;
    attendance: Array<Attendance>;
    dailyJoiningTime: string;
    email: string;
    firstLogin: boolean;
    game: [{ gameType: string; playerRank: string; schedule: boolean }];
    isPresent: boolean;
    name: string;
    opponentRank: string;
    password: string;
    progressInMatchSessions: { nMatchSessions: number; matchSession: Array<MatchSchedule> };
    progressInPracticeSessions: { nPracticeSessions: number; practiceSession: Array<PracticeSchedule> };
    ranking: string;
    role: string;
    todayCheckIn: Date;
  };
  matchSchedule: MatchSchedule = {
    gameType : '',
    startTime :null,
    endTime : null,
    coach_id : '',
    coachName : '',
    opponentName:'',
    court : '',
    opponent_id : '',
    winningStatus : 'not decided',
    marked : false,
    played:false
  };
  onlinePlayers: any = [];
  email: string = '';
  constructor(private auth: PlayerProfileService, private router: Router) {

  }

  ngOnInit() {
    this.auth.profile().subscribe(
      user => {
        //console.log(user.name);
        this.details = user;
      },
      err => {
        console.error(err)
      }
    )
    this.auth.getOnlinePlayers().subscribe(
      user => {
        //console.log(user.name);
        this.onlinePlayers = user;
      },
      err => {
        console.error(err)
      }
    )

  }


  editProfile() {
    console.log(this.oName);
    //this.matchSchedule.opponent_id = this.opponentPlayer._id;
    let id = '';
    for(let i = 0;i< this.onlinePlayers ; i++)
    {
      if(this.onlinePlayers[i].name == this.oName)
      {
        id = this.onlinePlayers[i]._id;
        break;
      }
    }
    this.matchSchedule.opponent_id = id;
    this.matchSchedule.opponentName = this.oName;
    this.details.progressInMatchSessions.matchSession.push(this.matchSchedule);
    console.log(this.details);
    this.auth.editCustomMatch(this.details).subscribe(
      () => {
        //this.router.navigateByUrl('/dashboard')
      },
      err => {
        console.error(err)
      }
    )
  }

}
