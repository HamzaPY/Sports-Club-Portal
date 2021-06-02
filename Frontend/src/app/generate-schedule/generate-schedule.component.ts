import { Component, OnInit } from '@angular/core';
import {AdminService, adminData} from "../admin.service";
import { Router } from '@angular/router'
import {AuthenticationService} from "../authentication.service";
import {PlayerProfileService, UserData, MatchSchedule, PracticeSchedule, userDataList} from "../player-profile.service";
import {CoachService, coachData, coachDataList} from "../coach.service";
import {gameDataList, GameService, gameData} from "../game.service";

@Component({
  selector: 'app-generate-schedule',
  templateUrl: './generate-schedule.component.html',
  styleUrls: ['./generate-schedule.component.css']
})
export class GenerateScheduleComponent implements OnInit {

  players:any= [];
  players2:any[];
  playersList:userDataList = new class implements userDataList {
    list: Array<UserData>;
  };
  playerList2:userDataList = new class implements userDataList {
    list: Array<UserData>;
  };
  onlinePlayers: any= [];
  coaches: any = [];
  coachList: coachDataList = new class implements coachDataList {
    list: Array<coachData>;
  };
  games: any = [];
  gamesList:gameDataList = new class implements gameDataList {
    list: Array<gameData>;
  };
  adminDetails : adminData;
  currentTime : Date;
  newPracticeSchedule1 : PracticeSchedule ;
  newPracticeSchedule2 : PracticeSchedule;
  newMatchSchedule1 : MatchSchedule ;
  newMatchSchedule2 : MatchSchedule;
  //{
  //   gameType : '',
  //   startTime : this.currentTime,
  //   endTime : this.currentTime,
  //   coach_id : '',
  //   coachName : '',
  //   opponentName:'',
  //   court : '',
  //   opponent_id : '',
  //   winningStatus : '',
  //   marked : false,
  //   played:false
  // }
  constructor(private router: Router,private game: GameService,private auth: AuthenticationService, private admin:AdminService,private coach: CoachService, private player:PlayerProfileService) { }

  ngOnInit(): void {
    /*Get admin profile from database*/
    this.admin.profile().subscribe(
      user => {
        this.adminDetails = user;

      },
      err => {
        console.error(err)
      }
    )
    ////get all players from database
    this.player.getPlayers().subscribe(
      user => {
        //console.log(user.name);
        this.players2 = user;

      },
      err => {
        console.error(err)
      }
    )

    ////get online players from database which are present
    this.player.getOnlinePlayers().subscribe(
      user => {
        //console.log(user.name);
        this.onlinePlayers.push(user);

      },
      err => {
        console.error(err)
      }
    )
    //console.log(this.adminDetails);

  /*Get All coaches from database*/
    this.coach.getCoaches().subscribe(
      user => {
        //console.log(user.name);
        this.coaches = user;

      },
      err => {
        console.error(err)
      }
    )
    /*Get All Games from database*/
    this.game.getGames().subscribe(
      user => {
        //console.log(user.name);
        this.games = user;

      },
      err => {
        console.error(err)
      }
    )
  }
 //////////////////////// //Generate Schedule/////////////////////////
  generateSchedule()
  {
    //console.log(this.adminDetails.playerNotification);
    //console.log(this.players);
    /*Get All Players in the notifications of admin from database*/
    for(let noti = 0; noti < this.adminDetails.playerNotification.length; noti++)
    {
      for(let p of this.players2)
      {
        if(p._id == this.adminDetails.playerNotification[noti].playerId)
        {
          this.players.push(p);
        }
      }
    }
    const nPlayers = this.players.length;
    //alert(nPlayers);
    let nGames1 = 0;
    let nGames2 = 0;
    let attendanceLength1 = 0;
    let attendanceLength2 = 0;
    let unScheduledGames = 0;
   for(let i = 0 ; i< nPlayers; i++)
   {
     unScheduledGames = 0;
     nGames1 = this.players[i].game.length;
     attendanceLength1 = this.players[i].attendance.length;
     //alert("in the loop")
     if(this.adminDetails.playerNotification[i].regularMatch )
     {
      // alert("Regular Match");
       for(let l=0;l<this.players[i].game.length;l++)
       {
         if(!this.players[i].game[l].schedule)
           unScheduledGames++;
       }
        //alert("unscheduled games  = "+unScheduledGames);
       for(let j = i+1; j<nPlayers; j++)
       {

         if(this.adminDetails.playerNotification[j].regularMatch)
         {
           if(unScheduledGames === 0){
             this.adminDetails.playerNotification[i].scheduleGenerated = true;
             break;
           }
          // alert(this.adminDetails.playerNotification[j].playerId);
           nGames2 = this.players[j].game.length;
           attendanceLength2 = this.players[j].attendance.length;
          //alert(nGames1);
         // alert(nGames2);
           if(nGames1>=nGames2)
           {
             for(let k = 0 ; k<nGames2 ; k++)
             {
               if(!(this.players[i].game[k].schedule ||this.players[j].game[k].schedule) &&  this.players[i].attendance[attendanceLength1-1].gamePriority[k].gameType === this.players[j].attendance[attendanceLength2-1].gamePriority[k].gameType &&  this.players[i].attendance[attendanceLength1-1].gamePriority[k].duration === this.players[j].attendance[attendanceLength2-1].gamePriority[k].duration)
               {
                 console.log(this.players[i].name);
                 this.newPracticeSchedule1 = new class implements PracticeSchedule {
                   coachName: '';
                   coach_id: '';
                   court: '';
                   endTime: null;
                   gameType: '';
                   marked: false;
                   opponentName: '';
                   opponent_id: '';
                   played: false;
                   startTime: null;
                   winningStatus: '';
                 };
                 this.newPracticeSchedule2 = new class implements PracticeSchedule {
                   coachName: '';
                   coach_id: '';
                   court: '';
                   endTime: null;
                   gameType: '';
                   marked: false;
                   opponentName: '';
                   opponent_id: '';
                   played: false;
                   startTime: null;
                   winningStatus: '';
                 };
                 for(let coach of this.coaches)  //selecting coach
                 {
                   if(coach.isAvailable)
                   {
                     this.newPracticeSchedule1.coach_id = coach._id;
                     coach.isAvailable = false;
                     this.newPracticeSchedule1.coachName = coach.name;
                     this.newPracticeSchedule2.coach_id = coach._id;
                     this.newPracticeSchedule2.coachName = coach.name;
                     break;
                   }
                 }
                 const gameType = this.players[i].game[k].gameType;
                 for(let game of this.games)
                 {
                   if(game.name === gameType)
                   {
                     for(let court of game.courts)
                     {
                       if(court.available)
                       {
                         this.newPracticeSchedule1.court = court.name;
                         this.newPracticeSchedule2.court = court.name;
                         court.available = false;
                         break;
                       }
                     }
                   }
                 }
                 //alert(gameType);
                 //alert(this.newPracticeSchedule1.court);
                 this.newPracticeSchedule1.gameType = gameType;
                 this.newPracticeSchedule2.gameType = gameType;
                 this.newPracticeSchedule1.opponentName = this.players[j].name;
                 this.newPracticeSchedule2.opponentName = this.players[i].name;
                 this.newPracticeSchedule1.opponent_id = this.players[j]._id;
                 this.newPracticeSchedule2.opponent_id = this.players[i]._id;
                 // @ts-ignore
                 let newStart:Date = new Date;

                 console.log(newStart);
                 if(k!==0 && this.players[i].game[k-1].schedule)
                 {
                   newStart.setMinutes(newStart.getMinutes()+50+this.players[i].attendance[attendanceLength1 - 1].gamePriority[k-1].Duration);
                 }
                 else {
                   newStart.setMinutes((newStart.getMinutes()+30));
                 }
                 //alert(newStart);
                 this.newPracticeSchedule2.startTime =this.newPracticeSchedule1.startTime = newStart;
                 // @ts-ignore
                 let newEnd:Date = new Date;
                 newEnd.setMinutes(newStart.getMinutes()+this.players[i].attendance[attendanceLength1 - 1].gamePriority[k].Duration);
                //alert(newEnd);
                 this.newPracticeSchedule2.endTime = this.newPracticeSchedule1.endTime = newEnd;
                 this.players[i].progressInPracticeSessions.practiceSession.push(this.newPracticeSchedule1);
                 this.players[j].progressInPracticeSessions.practiceSession.push(this.newPracticeSchedule2);
                 console.log(this.newPracticeSchedule1);
                 console.log(this.newPracticeSchedule2);
                 console.log(this.players[i].progressInPracticeSessions.practiceSession);
                 console.log(this.players[j].progressInPracticeSessions.practiceSession);
                 this.players[i].game[k].schedule = true;
                 this.players[j].game[k].schedule = true;

               }
             }
           }
           else if(nGames1<nGames2)
           {
             for(let k = 0 ; k<nGames1 ; k++)
             {
               if(!(this.players[i].game[k].schedule ||this.players[j].game[k].schedule)&& this.players[i].attendance[attendanceLength1-1].gamePriority[k].gameType === this.players[j].attendance[attendanceLength2-1].gamePriority[k].gameType &&  this.players[i].attendance[attendanceLength1-1].gamePriority[k].duration === this.players[j].attendance[attendanceLength2-1].gamePriority[k].duration)
               {
                 this.newPracticeSchedule1 = new class implements PracticeSchedule {
                   coachName: '';
                   coach_id: '';
                   court: '';
                   endTime: null;
                   gameType: '';
                   marked: false;
                   opponentName: '';
                   opponent_id: '';
                   played: false;
                   startTime: null;
                   winningStatus: '';
                 };
                 this.newPracticeSchedule2 = new class implements PracticeSchedule {
                   coachName: '';
                   coach_id: '';
                   court: '';
                   endTime: null;
                   gameType: '';
                   marked: false;
                   opponentName: '';
                   opponent_id: '';
                   played: false;
                   startTime: null;
                   winningStatus: '';
                 };
                 for(let coach of this.coaches)  //selecting coach
                 {
                   if(coach.isAvailable)
                   {
                     this.newPracticeSchedule1.coach_id = coach._id;
                     coach.isAvailable = false;
                     this.newPracticeSchedule1.coachName = coach.name;
                     this.newPracticeSchedule2.coach_id = coach._id;
                     this.newPracticeSchedule2.coachName = coach.name;
                     break;
                   }
                 }
                 const gameType = this.players[i].game[k].gameType;
                 for(let game of this.games)
                 {
                   if(game.gameType === gameType)
                   {
                     for(let court of game.courts)
                     {
                       if(court.available)
                       {
                         this.newPracticeSchedule1.court = court.name;
                         this.newPracticeSchedule2.court = court.name;
                         court.available = false;
                         break;
                       }
                     }
                   }
                 }
                 this.newPracticeSchedule1.gameType = gameType;
                 this.newPracticeSchedule2.gameType = gameType;
                 this.newPracticeSchedule1.opponentName = this.players[j].name;
                 this.newPracticeSchedule2.opponentName = this.players[i].name;
                 this.newPracticeSchedule1.opponent_id = this.players[j]._id;
                 this.newPracticeSchedule2.opponent_id = this.players[i]._id;
                 // @ts-ignore
                 let newStart:Date = new Date;
                 if(k!==0 && this.players[i].game[k-1].schedule)
                 {
                   newStart.setMinutes(newStart.getMinutes()+50+this.players[i].attendance[attendanceLength1 - 1].gamePriority[k-1].Duration);
                 }
                 else {
                   newStart.setMinutes((newStart.getMinutes()+30));
                 }
                 this.newPracticeSchedule2.startTime =this.newPracticeSchedule1.startTime = newStart;
                 // @ts-ignore
                 let newEnd:Date = new Date;
                 newEnd.setMinutes(newStart.getMinutes()+this.players[i].attendance[attendanceLength1 - 1].gamePriority[k].Duration);
                 this.newPracticeSchedule2.endTime = this.newPracticeSchedule1.endTime = newEnd;
                 this.players[i].progressInPracticeSessions.practiceSession.push(this.newPracticeSchedule1);
                 this.players[j].progressInPracticeSessions.practiceSession.push(this.newPracticeSchedule2);
                 this.players[i].game[k].schedule = true;
                 this.players[j].game[k].schedule = true;


               }
             }
           }

         }


       }

     }
     else if(!this.adminDetails.playerNotification[i].regularMatch)
     {
       const nSchedules = this.players[i].progressInMatchSessions.matchSession.length - 1;
       console.log(nSchedules);
       if(nSchedules>=0)
       {
         const opponentId = this.players[i].progressInMatchSessions.matchSession[nSchedules].opponent_id;
         this.newMatchSchedule1 = new class implements MatchSchedule {
           coachName: '';
           coach_id: '';
           court: '';
           endTime: null;
           gameType: '';
           marked: false;
           opponentName: '';
           opponent_id: '';
           played: false;
           startTime: null;
           winningStatus: '';
         };
         this.newMatchSchedule2 = new class implements MatchSchedule {
           coachName: '';
           coach_id: '';
           court: '';
           endTime: null;
           gameType: '';
           marked: false;
           opponentName: '';
           opponent_id: '';
           played: false;
           startTime: null;
           winningStatus: '';
         };
         this.newMatchSchedule1 = this.players[i].progressInMatchSessions.matchSession[nSchedules];


         const gameType = this.players[i].progressInMatchSessions.matchSession[nSchedules].gameType;
         //alert(gameType);
         for(let game of this.games)
         {
           if(game.name === gameType)
           {
             for(let court of game.courts)
             {
               if(court.available)
               {
                 this.newMatchSchedule1.court = court.name;
                 this.newMatchSchedule2.court = court.name;
                 court.available = false;
                 break;
               }
             }
           }
         }
         this.newMatchSchedule1.gameType = gameType;
         this.newMatchSchedule2.gameType = gameType;
         //alert("length of online = "+this.onlinePlayers.length)
         if(opponentId && opponentId !== '')
         {
           for(let coach of this.coaches)  //selecting coach
           {
             if(coach.isAvailable)
             {
               this.newMatchSchedule1.coach_id = coach._id;
               coach.isAvailable = false;
               this.newMatchSchedule1.coachName = coach.name;
               this.newMatchSchedule2.coach_id = coach._id;
               this.newMatchSchedule2.coachName = coach.name;
               break;
             }
           }
           for(let op of this.onlinePlayers)
           {
            // alert("searching online players");
             if(op._id === opponentId)
             {
              //  alert("opponentId = "+op._id);
               this.newMatchSchedule2.opponentName = this.players[i].name;
               this.newMatchSchedule2.opponent_id = this.players[i]._id;
               // @ts-ignore
               let newStart:Date = new Date;
               newStart.setMinutes(newStart.getMinutes()+20);
               this.newMatchSchedule2.startTime = this.newMatchSchedule1.startTime = newStart;

               // @ts-ignore
               let newEnd:Date = new Date;
               newEnd.setMinutes(newStart.getMinutes()+20+30);
              // alert(newEnd);
               this.newMatchSchedule2.endTime = this.newMatchSchedule1.endTime = newEnd;
               this.players[i].progressInMatchSessions.matchSession.splice(nSchedules,1);
               this.players[i].progressInMatchSessions.matchSession.push(this.newMatchSchedule1);
               op.progressInMatchSessions.matchSession.push(this.newMatchSchedule2);
               break;
             }

           }
         }
         else{
           for(let coach of this.coaches)  //selecting coach
           {
             if(coach.isAvailable)
             {

               this.newMatchSchedule1.opponent_id = coach._id;
               this.newMatchSchedule1.opponentName = coach.name;
               this.newMatchSchedule1.coach_id = coach._id;
               this.newMatchSchedule1.coachName = coach.name;
               break;
             }
           }
           // @ts-ignore
           let newStart:Date = new Date;
           newStart.setMinutes(newStart.getMinutes()+10);
           this.newMatchSchedule1.startTime = newStart;

           // @ts-ignore
           let newEnd:Date = new Date;
           newEnd.setMinutes(newStart.getMinutes()+10+30);
          // alert(newEnd);
           this.newMatchSchedule1.endTime = newEnd;
           this.players[i].progressInMatchSessions.matchSession.splice(nSchedules,1);
           this.players[i].progressInMatchSessions.matchSession.push(this.newMatchSchedule1);

         }
         this.adminDetails.playerNotification[i].scheduleGenerated = true;


       }

     }
   }
   //if player not available then assign coach
    let nGames = 0
    for(let i = 0; i<nPlayers ;i++)
    {
      //alert("Assigning Coach");
      nGames = this.players[i].game.length;
      for(let j = 0; j<nGames ; j++)
      {
        if(!this.players[i].game[j].schedule)
        {
          for(let coach of this.coaches)
          {
            if(coach.isAvailable)
            {
              this.newPracticeSchedule1 = new class implements PracticeSchedule {
                coachName: '';
                coach_id: '';
                court: '';
                endTime: null;
                gameType: '';
                marked: false;
                opponentName: '';
                opponent_id: '';
                played: false;
                startTime: null;
                winningStatus: '';
              };
              this.newPracticeSchedule1.coach_id = coach._id;
              coach.isAvailable = false;
              this.newPracticeSchedule1.coachName = coach.name;
              this.newPracticeSchedule1.opponentName = coach.name;
              this.newPracticeSchedule1.opponent_id = coach._id;
              // @ts-ignore
              let newStart:Date = new Date;
              newStart.setMinutes(newStart.getMinutes()+10);
              this.newPracticeSchedule1.startTime = newStart;
              // @ts-ignore
              let newEnding:Date = new Date;
              newEnding.setMinutes(newStart.getMinutes()+this.players[i].attendance[attendanceLength1 - 1].gamePriority[j].Duration);
              this.newPracticeSchedule1.endTime = newEnding;
              this.players[i].progressInPracticeSessions.practiceSession.push(this.newPracticeSchedule1);
              console.log(this.players[i].progressInPracticeSessions.practiceSession);
              this.players[i].game[j].schedule = true;
              break;
            }
          }
        }
      }
    }
  console.log(this.players);

   // Delete all notifications whose schedule has been generated
    let unScheduled = 0;
    for(let i = 0; i<nPlayers ; i++)
    {
      unScheduled = 0;
      nGames = this.players[i].game.length;
      for(let j=0; j<nGames; j++)
      {
        if(!this.players[i].game[j].schedule)
        {
          unScheduled++;
        }
      }
      if(unScheduled === 0)
      {
        this.adminDetails.playerNotification.splice(i,1);
      }

    }
    for(let i = 0; i< this.adminDetails.playerNotification.length; i++)
    {
      if(this.adminDetails.playerNotification[i].scheduleGenerated === true)
      {
        this.adminDetails.playerNotification.splice(i,1);
      }
    }

    console.log(this.onlinePlayers);
    // this.gamesList.list = this.games;
    // this.playersList.list = this.players;
    // this.playerList2.list = this.onlinePlayers;
    // this.coachList.list = this.coaches;
    this.sendData();
  }

  sendData()
  {
    this.admin.editPro(this.adminDetails).subscribe(
      user => {
        console.log("adminDetails sent to Database");

      },
      err => {
        console.error(err)
      }
    )
    // console.log(this.playersList);
    // console.log(this.coachList);
    for(let p of this.players)
    {
      this.player.editPro(p).subscribe(
        user => {
          console.log("player  sent to Database");

        },
        err => {
          console.error(err)
        }
      )
    }

    for(let p of this.onlinePlayers)
    {
      this.player.editPro(p).subscribe(
        user => {
          console.log("player online  sent to Database");

        },
        err => {
          console.error(err)
        }
      )
    }
    for(let c of this.coaches)
    {
      this.coach.editPro(c).subscribe(
        user => {
          console.log("coach  sent to Database");

        },
        err => {
          console.error(err)
        }
      )
    }
    for(let g of this.games)
    {
      this.game.editSingleGame(g).subscribe(
        user => {
          console.log("game  sent to Database");

        },
        err => {
          console.error(err)
        }
      )
    }

   // this.router.navigateByUrl('/admin');
  }
  logout() {

    this.auth.logoutAdmin();
    this.router.navigateByUrl('/login')
  }
}
