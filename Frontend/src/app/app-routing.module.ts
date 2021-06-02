import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FrontCarouselComponent} from "./main-page/front-carousel.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AttendancePriorityComponent} from "./attendance-priority/attendance-priority.component";
import {PlayerProgressComponent} from "./player-progress/player-progress.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { PlayersListComponent } from './players-list/players-list.component';
import {CoachDashboardComponent} from "./coach-dashboard/coach-dashboard.component";
import {PracticeSessionsComponent} from "./practice-sessions/practice-sessions.component";
import {MatchSessionsComponent} from "./match-sessions/match-sessions.component";
import {MatchScheduleComponent} from "./match-schedule/match-schedule.component";
import {PracticeScheduleComponent} from "./practice-schedule/practice-schedule.component";
import {CustomOpponentMatchComponent} from "./custom-opponent-match/custom-opponent-match.component";
import {GenerateScheduleComponent} from "./generate-schedule/generate-schedule.component";
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { CoachRegisterComponent } from './coach-register/coach-register.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';
import { CoachEditComponent } from './coach-edit/coach-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: FrontCarouselComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'profile', component:ProfileComponent},
  { path: 'login', component:LoginComponent},
  { path: 'attendance', component: AttendancePriorityComponent},
  { path: 'progress', component: PlayerProgressComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'playerlist', component: PlayersListComponent},
  { path: 'coach', component: CoachDashboardComponent},
  { path: 'practiceSession', component: PracticeSessionsComponent},
  { path: 'matchSession', component: MatchSessionsComponent},
  { path: 'matchSchedule', component: MatchScheduleComponent},
  { path: 'practiceSchedule', component: PracticeScheduleComponent},
  { path: 'customOpponent', component: CustomOpponentMatchComponent},
  { path: 'generateSchedule', component: GenerateScheduleComponent},
  { path: 'adminRegister', component: AdminRegisterComponent},
  { path: 'coachRegister', component: CoachRegisterComponent},
  { path: 'coachlist', component: CoachListComponent},
  { path: 'superAdmin', component: SuperAdminComponent},
  { path: 'playerEdit/:id', component: PlayerEditComponent},
  { path: 'coachEdit/:id', component: CoachEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
