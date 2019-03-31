import { Component, OnInit, NgModule, AfterViewInit } from "@angular/core";
import { AccountService } from "../../shared/accountservice";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { UserView } from "../../models/userview";
import { UsersService } from '../users/users.service';
import { ScreenStatus } from '../../enums/screenstatus';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/** home component*/
export class HomeComponent implements OnInit {
  public user: User;
  public users: Array<UserView>;
  public role: string;
  public defaultImage: string;
  public activeMenteesCount: number;
  public activeMentorCount: number;
  public unmatchedActiveMenteesCount: number;
  public unmatchedActiveMentorCount: number;
  public menteesPendingScreening: number;
  public mentorsPendingScreening: number;
  public menteesNeedingScreening: number;
  public mentorsNeedingScreening: number;
  ScreenType: any = ScreenStatus;
  public menteeMatchedPercentage: string;
  public mentorMatchedPercentage: string;

  /** home ctor */
  constructor(private usersService: UsersService, private userService: UserService, private accountService: AccountService, private router: Router) {
    this.defaultImage = "https://www.dropbox.com/s/m7lteis9sb5djcb/DefaultImg.png?raw=1";
    this.users = new Array<UserView>();
    this.usersService.notify_users_with_roles_changed();
  }

  ngOnInit(): void {
    let newUser = this.userService.get();
    if (newUser) {
      this.user = newUser;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.role = this.user.role;

    this.usersService.users$.subscribe(data => {
      this.activeMenteesCount = data.filter(x => x.role === "Mentee" && x.screen_status === this.ScreenType.Successful).length;
      this.activeMentorCount =
        data.filter(x => x.role === "Mentor" && x.screen_status === this.ScreenType.Successful).length;
      this.unmatchedActiveMenteesCount =
        data.filter(x => x.role === "Mentee" && x.screen_status === this.ScreenType.Successful && x.Mentorid === null).length;
      this.unmatchedActiveMentorCount =
        data.filter(x => x.role === "Mentor" && x.screen_status === this.ScreenType.Successful && x.mentee_count < 1)
          .length;
      this.menteesPendingScreening =
        data.filter(x => x.role === "Mentee" && x.screen_status === this.ScreenType.Pending).length;
      this.mentorsPendingScreening =
        data.filter(x => x.role === "Mentor" && x.screen_status === this.ScreenType.Pending).length;
      this.menteesNeedingScreening =
        data.filter(x => x.role === "Mentee" && x.screen_status === this.ScreenType.NotStarted).length;
      this.mentorsNeedingScreening =
        data.filter(x => x.role === "Mentor" && x.screen_status === this.ScreenType.NotStarted).length;

      //get match percentages
      this.menteeMatchedPercentage =
        ((this.activeMenteesCount - this.unmatchedActiveMenteesCount) / this.activeMenteesCount * 100).toString() + "%";
      this.mentorMatchedPercentage =
        ((this.activeMentorCount - this.unmatchedActiveMentorCount) / this.activeMentorCount * 100).toString() + "%";
    });
  }
}
