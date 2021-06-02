import { Component } from '@angular/core'
import { AuthenticationService, TokenPayload } from '../authentication.service'
import { Router } from '@angular/router'

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials: TokenPayload = {
    _id:'',
    name: '',
    email: '',
    password: '',
    role: 'Player',
    gender: true,
    dailyJoiningTime: '8 am',
    tennis:{gameType:'',playerRank:''},
    table_tennis:{gameType:'',playerRank:''},
    badminton:{gameType:'',playerRank:''},
    squash:{gameType:'',playerRank:''}
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    if(this.credentials.role === "Coach")
    {
      this.auth.loginCoach(this.credentials).subscribe(
        () => {
          //console.log(this.auth.getToken());
          if(this.credentials)
            this.router.navigateByUrl('/coach')
        },
        err => {
          console.error(err)
        })
    }
    else if(this.credentials.role === "Admin")
    {
      if(this.credentials.email === "mohdhamza4@gmail.com" && this.credentials.password === "12345678")
      {
        this.auth.loginAdmin(this.credentials).subscribe(
          () => {
           // console.log(this.auth.getToken());
            if(this.credentials)
              this.router.navigateByUrl('/superAdmin')
          },
          err => {
            console.error(err)
          })
       // this.router.navigateByUrl('/superAdmin')
      }
      else
      {
      this.auth.loginAdmin(this.credentials).subscribe(
        () => {
          //console.log(this.auth.getToken());
          if(this.credentials)
            this.router.navigateByUrl('/admin')
        },
        err => {
          console.error(err)
        })
      }
    }
    else
    {
      this.auth.login(this.credentials).subscribe(
        () => {
          //console.log(this.auth.getToken());
          if(this.credentials)
          this.router.navigateByUrl('/profile')
        },
        err => {
          console.error(err)
        }
      )
    }
  }
}
