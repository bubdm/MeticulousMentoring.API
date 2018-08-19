import { Component, OnInit, NgModule, AfterViewInit } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { Mentee } from '../interfaces/mentee';
import { Mentor } from '../interfaces/mentor';
import { Address } from '../interfaces/address'
import { Classification } from '../interfaces/classification'
import { School } from '../interfaces/school'
import { EducationalSystem } from "../interfaces/educational_system"
import { MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenteeFormComponent } from '../forms/mentee.form.component';
import { MentorFormComponent } from '../forms/mentor.form.component';
import { DirectorFormComponent } from '../forms/director.form.component';
import * as $ from "jquery/dist/jquery.min.js";
import "../../assets/script.js";

@NgModule({
  imports: [MenteeFormComponent,
    MentorFormComponent,
    DirectorFormComponent]
})

@Component({
  selector: "dashboard",
  templateUrl: "dashboard.component.html",
  styleUrls: ["dashboard.component.css"]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public user: IUser;
  public users;
  public role: string;

  isExpanded = false;
  mentee: Mentee;
  mentor: Mentor;
  school: School;
  educational_system: EducationalSystem;

  constructor(private userService: UserService, private auth: AccountService, private router: Router, public dialog: MatDialog) { }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    $(document).ready(function () {
      $('#sidebarCollapse').on('click',
        function () {
          $('#sidebar').toggleClass('active');
          $('#content').toggleClass('active');
          $('.collapse.in').toggleClass('in');
          $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        });
    });
    //this.user = this.userService.get();
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate([""]);
    } else {
      this.role = this.user.role;
      if (this.user.role === "Admin") {
        this.getUsers();
      }
    }
  }

  public getUsers() {
    let response = this.auth.get_users()
      .subscribe(
        data => {
          this.users = new MatTableDataSource(data);
        },
        error => console.log(error));
  }

  public logout() {
    localStorage.removeItem('user');
    this.userService.delete();
    this.auth.logout();
    this.router.navigate([""]);
  }
}
