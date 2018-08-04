import { Component, OnInit } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { AdminService } from '../shared/admin.service';
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { MatTableDataSource } from '@angular/material';
import { Mentee } from '../models/mentee';
import { UserView } from '../models/userview';

@Component({
  selector: "admin-dashboard",
  templateUrl: "admin.component.html",
  styleUrls: ["admin.component.css"]
})
export class AdminComponent implements OnInit {
  public user: IUser;
  public role: string;
  public total_mentees: number = 0;
  public total_unmatched_mentees: number = 0;
  public total_mentors: number = 0;
  public total_male = 0;
  public total_female = 0;
  math: any;
  public mentees: Array<Mentee[]>;
  public users: Array<UserView>;

  constructor(private userService: UserService,
    private auth: AccountService,
    private router: Router,
    private menteeService: MenteeService,
    private mentorService: MentorService,
    private adminService: AdminService) {
    this.math = Math;
    this.users = new Array<UserView>();

    this.adminService.notify_users_change();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.menteeService.get_total_mentees()
      .subscribe(data => {
        this.total_mentees = data.length;
        this.total_male = data.filter(element => element.menteeGender === 'M').length;
        this.total_female = data.filter(element => element.menteeGender === 'F').length;
      });

    this.mentorService.get_mentors()
      .subscribe(data => {
        this.total_mentors = data.length;
      });
    this.menteeService.get_mentees()
      .subscribe(data => {
        this.total_unmatched_mentees = data.length;
      });

    this.adminService.users$.subscribe(data => {
      this.users = data;
    });
  }
}
