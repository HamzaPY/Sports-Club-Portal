import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import {AuthenticationService, UserDetails} from "./authentication.service";

export interface UserData {
  _id:string,
  name:string,
  email:string,
  password:string,
  role: string,
  ranking: string,
  dailyJoiningTime:string,
  game:[{
    gameType:string,
    playerRank:string,
    schedule: boolean
  }],
  opponentRank:string,
  isPresent:boolean,
  firstLogin:boolean,
  todayCheckIn: Date,
  attendance:Array<Attendance>,
  progressInPracticeSessions:{
    nPracticeSessions: number,
    practiceSession: Array<PracticeSchedule>
  },
  progressInMatchSessions:{
    nMatchSessions:number,
    matchSession: Array<MatchSchedule>
  }
}

export interface Attendance{
  checkIn: Date,
  gamePriority:Array<game>
}

export interface MatchSchedule{
  gameType : string,
  startTime : Date,
  endTime : Date,
  coach_id : string,
  coachName : string,
  opponentName:string,
  court : string,
  opponent_id : string,
  winningStatus : string,
  marked : boolean,
  played:boolean
}
export interface PracticeSchedule{
  gameType : string,
  startTime : Date,
  endTime : Date,
  coach_id : string,
  coachName:string,
  opponentName:string,
  court : string,
  opponent_id : string,
  winningStatus : string,
  marked: boolean,
  played:boolean
}

export interface gamePriority {
  gamePriority : Array<game>
}
export interface game {
  gameType : string,
  priority : number,
  Duration : number
}

export interface userDataList {
  list:Array<UserData>
}
@Injectable({
  providedIn: 'root'
})
export class PlayerProfileService {
  baseUri:string = 'http://localhost:3000/player';
  constructor(private http: HttpClient, private router: Router,private auth:AuthenticationService) { }
  public profile(): Observable<any> {
    return this.http.get('http://localhost:3000/player/profile', {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }
  public profileById(id:string): Observable<any> {
    return this.http.get('http://localhost:3000/player/get/'+id, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }
  public profileByEmail(email : string): Observable<any> {
    return this.http.get('http://localhost:3000/player/profile/'+email, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public getPlayers(): Observable<any> {
    return this.http.get('http://localhost:3000/player/all', {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }

  public getOnlinePlayers(): Observable<any> {
    return this.http.get('http://localhost:3000/player/getOnlinePlayers', {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }
  public editPro(user: UserData): Observable<any> {
    //alert(user.opponentRank);
    //alert(user._id);
    let url = `${this.baseUri}/edit/${user._id}`;
    return this.http.post(url, user, {headers: { Authorization: `${this.auth.getToken()}` }})
  }

  public deletePlayer(id): Observable<any> {
    let url = `http://localhost:3000/player/delete/`+id;
    return this.http.delete(url, {headers: { Authorization: `${this.auth.getToken()}` }}
  )}

  public editCustomMatch(user: UserData): Observable<any> {
    //alert(user.opponentRank);
    let url = `${this.baseUri}/edit/customMatch`;
    return this.http.post(url, user, {headers: { Authorization: `${this.auth.getToken()}` }})
  }

  public editPlayers(user: userDataList): Observable<any> {
    //alert(user.opponentRank);
    //console.log(user);
    let url = `${this.baseUri}/edit/players`;
    return this.http.post(url, user, {headers: { Authorization: `${this.auth.getToken()}` }})
  }
  public attendance(user: UserData): Observable<any>{
    console.log(user);
    let params = new HttpParams();
    params = params.append("id", user._id);
    return this.http.post(`http://localhost:3000/player/markAttendance/`+user._id, user, { headers: { Authorization: `${this.auth.getToken()}` }})
  }
}
