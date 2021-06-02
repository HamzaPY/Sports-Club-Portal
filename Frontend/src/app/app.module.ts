import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FrontCarouselComponent } from './main-page/front-carousel.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http'
import {RouterModule, Routes} from '@angular/router'
import {AuthenticationService} from './authentication.service';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AttendancePriorityComponent } from './attendance-priority/attendance-priority.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PlayerProgressComponent } from './player-progress/player-progress.component';
import { PlayerHeaderComponent } from './player-header/player-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin/admin.component';
import { PlayersListComponent } from './players-list/players-list.component';
import { CoachDashboardComponent } from './coach-dashboard/coach-dashboard.component';
import { PracticeSessionsComponent } from './practice-sessions/practice-sessions.component';
import { MatchSessionsComponent } from './match-sessions/match-sessions.component';
import { PracticeScheduleComponent } from './practice-schedule/practice-schedule.component';
import { MatchScheduleComponent } from './match-schedule/match-schedule.component';
import { CustomOpponentMatchComponent } from './custom-opponent-match/custom-opponent-match.component';
import { GenerateScheduleComponent } from './generate-schedule/generate-schedule.component';
import { CoachListComponent } from './coach-list/coach-list.component';
import { CoachRegisterComponent } from './coach-register/coach-register.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { CoachEditComponent } from './coach-edit/coach-edit.component';
import { PlayerEditComponent } from './player-edit/player-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FrontCarouselComponent,
    HomePageComponent,
    PlayerRegistrationComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    AttendancePriorityComponent,
    NavigationComponent,
    PlayerProgressComponent,
    PlayerHeaderComponent,
    DashboardComponent,
    AdminComponent,
    PlayersListComponent,
    CoachDashboardComponent,
    PracticeSessionsComponent,
    MatchSessionsComponent,
    PracticeScheduleComponent,
    MatchScheduleComponent,
    CustomOpponentMatchComponent,
    GenerateScheduleComponent,
    CoachListComponent,
    CoachRegisterComponent,
    AdminRegisterComponent,
    SuperAdminComponent,
    CoachEditComponent,
    PlayerEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
