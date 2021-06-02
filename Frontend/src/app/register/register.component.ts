import { Component } from '@angular/core'
import {AuthenticationService, TokenPayload, UserDetails, game} from '../authentication.service'
import { Router } from '@angular/router'
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    _id:'',
    name: '',
    email: '',
    password: '',
    gender: true,
    role:"Player",
    dailyJoiningTime: '08:00',
    tennis:{gameType:'',playerRank:'Beginner'},
    table_tennis:{gameType:'',playerRank:'Beginner'},
    badminton:{gameType:'',playerRank:'Beginner'},
    squash:{gameType:'',playerRank:'Beginner'}
  };
  credentials2: UserDetails;
  selectedGames: Array<game> = [];
  constructor(private auth: AuthenticationService, private router: Router) {
  }

  selectGame(num: number)
  {
    if(num === 1 && this.credentials.tennis.gameType)
      this.credentials.tennis.gameType = "Tennis";
    if(num === 2 && this.credentials.table_tennis.gameType)
      this.credentials.table_tennis.gameType = "Table_Tennis";
    if(num === 3 && this.credentials.badminton.gameType)
      this.credentials.badminton.gameType = "Badminton";
    if(num === 4 && this.credentials.squash.gameType)
      this.credentials.squash.gameType = "Squash";
  }
  register() {
  if(this.credentials.tennis.gameType && this.credentials.tennis.playerRank !== '')
    this.selectedGames.push(this.credentials.tennis);
  if(this.credentials.table_tennis.gameType && this.credentials.table_tennis.playerRank !== '')
    this.selectedGames.push(this.credentials.table_tennis);
  if(this.credentials.badminton.gameType && this.credentials.badminton.playerRank!== '')
    this.selectedGames.push(this.credentials.badminton);
  if(this.credentials.squash.gameType && this.credentials.squash.playerRank !== '')
    this.selectedGames.push(this.credentials.squash);

    if (this.selectedGames.length != 0)
    {
      this.credentials2 = {
        _id:this.credentials._id,
        role:"Player",
          name: this.credentials.name,
          email: this.credentials.email,
          password: this.credentials.password,
          gender: this.credentials.gender,
          dailyJoiningTime: '8 am',
          game:this.selectedGames
        };
        this.auth.register(this.credentials2).subscribe(
          () => {
            this.router.navigateByUrl('/login')
          },
          err => {
            console.error(err)
          }
        )
    }
    else
    {
      alert("No Game Selected...")
    }
  }
}
