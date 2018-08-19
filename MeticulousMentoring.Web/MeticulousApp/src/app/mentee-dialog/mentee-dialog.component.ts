import { Component, OnInit, Inject } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MenteeService } from '../shared/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { TimelineService } from '../shared/timeline.service';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
  selector: 'app-mentee-dialog',
  templateUrl: './mentee-dialog.component.html',
  styleUrls: ['./mentee-dialog.component.css']
})
export class MenteeDialogComponent implements OnInit {
  public user: IUser;
  public mentee = {};
  public menteeId;
  public mentor = {};
  public guardian = {};
  public grades = {};
  public gradeGroup = {};
  public messages: number = 1;
  public timelineData = {};

  constructor(private menteeService: MenteeService,
    private mentorService: MentorService,
    private userService: UserService,
    private timelineService: TimelineService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<MenteeDialogComponent>) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate([""]);
    } else {
      if (this.user.role == 'Mentee') {
        this.menteeId = this.user.iat;
      } else {
        this.menteeId = this.data.menteeId;
      }

      this.menteeService.get_mentee_by_id(this.menteeId)
        .subscribe(data => {
          this.mentee = data;
        },
          error => console.log(error));

      this.menteeService.get_mentor_by_mentee_id(this.menteeId)
        .subscribe(data => {
          this.mentor = data;
        },
          error => console.log(error));

      this.menteeService.get_guardian_by_mentee_id(this.menteeId)
        .subscribe(data => {
          this.guardian = data;
        },
          error => console.log(error));

      this.menteeService.get_mentee_grades(this.menteeId)
        .subscribe(data => {
          this.grades = data;
        },
          error => console.log(error));

      this.timelineService.get_timeline_data(this.menteeId)
        .subscribe(data => {
          this.timelineData = data;
        },
          error => console.log(error));
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
