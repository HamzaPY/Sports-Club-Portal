import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormArray} from "@angular/forms";

@Component({
  selector: 'app-player-registration',
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css']
})
export class PlayerRegistrationComponent implements OnInit {
  signUp = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl(''),
    userName : new FormControl(''),
    password : new FormControl(''),
    confirmPassword : new FormControl(''),
    tennis : new FormControl(''),
    tennisRank : new FormControl('Beginner'),
    squash : new FormControl(''),
    squashRank : new FormControl('Beginner'),
    table_tennis : new FormControl(''),
    table_tennisRank : new FormControl('Beginner'),
    badminton : new FormControl(''),
    badmintonRank : new FormControl('Beginner'),
  });

  constructor() { }

  ngOnInit(): void {

  }
}
