import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import {AuthenticationService, UserDetails} from "./authentication.service";
import {UserData} from "./player-profile.service";
import {gameData, gameDataList} from "./game.service";
export interface coachData {
  _id:string,
  name : string,
  role : string,
  email : string,
  password : string,
  isAvailable : boolean
}
export interface coachDataList {
  list:Array<coachData>
}
@Injectable({
  providedIn: 'root'
})
export class CoachService {

  constructor(private http: HttpClient, private router: Router,private auth:AuthenticationService) { }
  public profile(): Observable<any> {
    return this.http.get('http://localhost:3000/coach/profile', {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }
  public profileById(id:string): Observable<any> {
    return this.http.get('http://localhost:3000/coach/get/'+id, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }
  public profileId(user): Observable<any> {
    return this.http.get('http://localhost:3000/coach/'+user, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }


  public getCoaches(): Observable<any> {
    return this.http.get('http://localhost:3000/coach/getAll', {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }

  public editPro(user: coachData): Observable<any> {
    //alert(user.opponentRank);
    let url = `http://localhost:3000/coach/edit/${user._id}`;
    return this.http.post(url, user, {headers: { Authorization: `${this.auth.getToken()}` }})
  }
  public editCoaches(coaches: coachDataList): Observable<any> {
    //alert(user.opponentRank);
    return this.http.post('http://localhost:3000/coach/editAll', coaches, {headers: { Authorization: `${this.auth.getToken()}` }})
  }

  public deleteCoach(id): Observable<any> {
    let url = `http://localhost:3000/coach/delete/`+id;
    return this.http.delete(url, {headers: { Authorization: `${this.auth.getToken()}` }}
    )}

}
