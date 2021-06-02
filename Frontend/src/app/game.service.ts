import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
//import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router'
import {AuthenticationService} from "./authentication.service";

export interface gameData {
  name : string,
  nCourts : number,
  courts : [{
    name : string,
    available : boolean
  }]
}

export interface gameDataList {
  list:Array<gameData>
}
@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient, private router: Router,private auth:AuthenticationService) { }
  public getGames(): Observable<any> {
    return this.http.get('http://localhost:3000/Game/getAll', {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }
  public getGame(name: string): Observable<any> {
    return this.http.get('http://localhost:3000/game/get/'+name, {
      headers: { Authorization: `${this.auth.getToken()}` } })
  }
  public setGame(game: gameData): Observable<any> {
    return this.http.post('http://localhost:3000/game/set/'+game.name, game,{
      headers: { Authorization: `${this.auth.getToken()}` } })
  }
  public editGames(games: gameDataList): Observable<any> {
    //alert(user.opponentRank);
    return this.http.post('http://localhost:3000/Game/edit', games, {headers: { Authorization: `${this.auth.getToken()}` }})
  }
  public editSingleGame(game: gameData): Observable<any> {
    //alert(user.opponentRank);
    return this.http.post('http://localhost:3000/Game/edit/'+game.name, game, {headers: { Authorization: `${this.auth.getToken()}` }})
  }
}
