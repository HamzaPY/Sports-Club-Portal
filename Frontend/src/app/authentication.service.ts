import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import {coachData, coachDataList} from "./coach.service";

export interface UserDetails {
  _id:string
  name: string
  email: string
  password: string,
  role:string,
  gender: boolean,
  dailyJoiningTime: string,
  game:Array<game>
}

export interface adminDetails {
  _id:string,
  name : string,
  role : string,
  email : string,
  password : string,
  isAvailable : boolean
}

export interface game{
  gameType: string,
  playerRank: string
}
interface TokenResponse {
  token: string
}

export interface TokenPayload {
  _id:string
  name: string
  email: string
  password: string,
  role:string,
  gender: boolean,
  dailyJoiningTime: string,
  tennis: game,
  squash: game,
  table_tennis: game,
  badminton: game
}

export interface PayloadCoach {
  _id:string,
  name : string,
  role : string,
  email : string,
  password : string,
  isAvailable : boolean
}

export interface PayloadAdmin {
  _id:string,
  name : string,
  role : string,
  email : string,
  password : string,
  isAvailable : boolean
}


@Injectable()
export class AuthenticationService {
  private token: string;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, private router: Router) {}

  public saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  // public isLoggedIn(): boolean {
  //   const user = this.getUserDetails()
  //   if (user) {
  //     return user.exp > Date.now() / 1000
  //   } else {
  //     return false
  //   }
  // }

  public register(user: UserDetails): Observable<any> {
   // alert(user.email);
    const base = this.http.post('http://localhost:3000/player/register', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }

  public adminRegister(user: adminDetails): Observable<any> {
    // alert(user.email);
    const base = this.http.post('http://localhost:3000/player/register/admin', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }

  public coachRegister(user: coachData): Observable<any> {
     alert(user.email);
    const base = this.http.post('http://localhost:3000/player/coachRegister', user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }

  public login(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://localhost:3000/player/login`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log(data.token)
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }
  public loginCoach(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://localhost:3000/player/login/coach`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data
      })
    )

    return request
  }
  public loginAdmin(user: TokenPayload): Observable<any> {
    const base = this.http.post(`http://localhost:3000/player/login/admin`, user)

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }

  public profile(): Observable<any> {

    return this.http.get(`http://localhost:3000/player/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }

  public getAdmin(): Observable<any> {

    return this.http.get<PayloadAdmin>(`http://localhost:3000/player/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }
  public getCoach(): Observable<any> {

    return this.http.get<PayloadAdmin>(`http://localhost:3000/coach/profile`, {
      headers: { Authorization: `${this.getToken()}` }
    })
  }
  public editPro(user: UserDetails): Observable<any> {
    let params = new HttpParams();
    params = params.append("id", user._id);
    return this.http.post(`http://localhost:3000/player/profile/edit`, user, {params:params, headers: this.headers })
  }

  public logout() {
    const t = this.getToken();
    this.http.post('http://localhost:3000/player/markAbsent',{
      headers: { Authorization: `${t}` }
    })
    this.token = ''
    window.localStorage.removeItem('usertoken');



  }
  public logoutCoach(): void {
    this.http.post(`http://localhost:3000/player/coach/logout`, {
      headers: { Authorization: `${this.getToken()}` }
    })
    this.token = ''
    window.localStorage.removeItem('usertoken')
    //this.router.navigateByUrl('/')
  }
  public logoutAdmin(): void {
    this.http.post(`http://localhost:3000/player/admin/logout`, {
      headers: { Authorization: `${this.getToken()}` }
    })
    this.token = ''
    window.localStorage.removeItem('usertoken')
    //this.router.navigateByUrl('/')
  }

}
