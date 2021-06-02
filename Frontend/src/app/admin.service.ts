import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import {AuthenticationService, UserDetails} from "./authentication.service";
import {UserData} from "./player-profile.service";
export interface adminData {
  _id:string,
  name : string,
  role : string,
  email : string,
  password : string,
  isAvailable: boolean,
  playerNotification:[{
    playerId: string,
    regularMatch: boolean,
    scheduleGenerated : boolean
  }]
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private router: Router,private auth:AuthenticationService) { }
  public profile(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/profile', {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }
  public profileById(user:adminData): Observable<any> {
    return this.http.get('http://localhost:3000/admin/profile/'+user._id, {
      headers: { Authorization: `${this.auth.getToken()}` }
    })
  }

  public getAdmins(): Observable<any> {
    return this.http.get('http://localhost:3000/admin/getAll', {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }

  public editPro(user: adminData): Observable<any> {
    //alert(user.opponentRank);
    let url = `http://localhost:3000/admin/edit/${user._id}`;
    return this.http.post(url, user, {headers: { Authorization: `${this.auth.getToken()}` }})
  }

}
