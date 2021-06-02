import { Component, OnInit } from '@angular/core';
import {CoachService, coachData} from "../coach.service";
import {PlayerProfileService, UserData, userDataList} from "../player-profile.service";
import {AuthenticationService} from "../authentication.service";
import { Router } from '@angular/router'
import {gameData, gameDataList, GameService} from "../game.service";
@Component({
  selector: 'app-practice-sessions',
  templateUrl: './practice-sessions.component.html',
  styleUrls: ['./practice-sessions.component.css']
})
export class PracticeSessionsComponent implements OnInit {

  games: Array<gameData>;
  gamesList: gameDataList = new class implements gameDataList {
    list: Array<gameData>;
  };
  unmarkedPlayers:Array<UserData> = [];
  playerList: userDataList =  new class implements userDataList {
    list: Array<UserData>;
  };
  coachDetails: coachData;
  // @ts-ignore
  currentDate: Date = new Date;
  constructor(private coach: CoachService,private game:GameService , private auth:AuthenticationService, private player:PlayerProfileService,private router: Router) { }

  ngOnInit(): void {
    this.coach.profile().subscribe(
      user => {
        //console.log(user.name);
        this.coachDetails = user
      },
      err => {
        console.error(err)
      }
    )
    this.player.getPlayers().subscribe(
      user => {
        //console.log(user.name);
        for(let player of user)
        {
          for(let practice of player.progressInPracticeSessions.practiceSession)
          {
            // @ts-ignore
            if(practice.coach_id === this.coachDetails._id)
            {
              if(!practice.marked)
              {this.unmarkedPlayers.push(player);
              break;}
            }
          }
        }
      },
      err => {
        console.error(err)
      }
    )
    this.game.getGames().subscribe(
      user => {
        //console.log(user.name);
        this.games = user
      },
      err => {
        console.error(err)
      }
    )
  }

  submit(){
    let count = 0;
    for(let player of this.unmarkedPlayers)
    {
      count = 0;
      for(let session of player.progressInPracticeSessions.practiceSession)
      {
        if(session.played)
          count++;
        if(session.marked)
        {
          let name = session.gameType;
          let court = session.court;
          for(let g of this.games)
          {
            if(g.name === name)
            {
              for(let c of g.courts)
              {
                if(c.name === court)
                  c.available = true;
              }
            }
          }
        }
      }
      player.progressInPracticeSessions.nPracticeSessions = count;
    }
    this.coachDetails.isAvailable = true;
    this.gamesList.list = this.games;
    this.playerList.list = this.unmarkedPlayers;
    this.player.editPlayers(this.playerList).subscribe(() => {
        this.router.navigateByUrl('/coach')
      },
      err => {
        console.error(err)
      })
    this.game.editGames(this.gamesList).subscribe(
      user => {
        //console.log(user.name);
        //this.coachDetails = user
      },
      err => {
        console.error(err)
      }
    )
    this.coach.editPro(this.coachDetails).subscribe(
      user=>{},
      err=>{console.error((err))}
    )
  }
  logout() {

    this.auth.logout();
    this.router.navigateByUrl('/home')
  }

}
