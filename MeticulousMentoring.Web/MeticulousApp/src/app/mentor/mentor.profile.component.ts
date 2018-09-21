import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MenteeService } from '../shared/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { TimelineService } from '../shared/timeline.service';
import { _ } from "underscore";
import { MatDialog } from '@angular/material';
import { Mentee } from '../models/mentee';
import { Mentor } from '../models/mentor';
import { MenteeDialogComponent } from '../mentee-dialog/mentee-dialog.component';
import 'rxjs/Rx';

@NgModule({
  imports: [MenteeDialogComponent]
})

@Component({
  selector: 'mentor-profile',
  templateUrl: './mentor.profile.component.html',
  styleUrls: ['./mentor.profile.component.css']
})
export class MentorProfileComponent implements OnInit {
  public user: IUser;
  public mentor: Mentor = new Mentor();
  public mentorId;
  public messages: number = 0;
  public menteeId;
  public timelineData = [];
  public mentorMentees: Array<Mentee> = new Array<Mentee>();

  mentee: Mentee;

  constructor(private menteeService: MenteeService,
    private mentorService: MentorService,
    private timelineService: TimelineService,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if (!this.user) {
      this.router.navigate([""]);
    } else {
      this.mentorId = this.user.iat;

      this.mentorService.get_mentor_by_id(this.mentorId)
        .subscribe(data => {
          this.mentor = data;
          this.mentorMentees = ((this.mentor.mentorMentees) as any);
          this.addMenteeCurrentGpa(this.mentorMentees);
        },
          error => console.log(error));
    }

    this.timelineService.get_timeline_data(this.mentorId)
      .subscribe(data => {
        this.timelineData = <any[]>(data);
      },
        error => console.log(error));
  }

  public openMenteeFormDialog(mId) {
    let dialogRef = this.dialog.open(MenteeDialogComponent,
      {
        width: '1400px',
        height: '860px',
        data: { menteeId: mId }
      });

    dialogRef.afterClosed().subscribe(result => {
      this.mentee = result;
    });
  }

  public async addMenteeCurrentGpa(mentees: Array<Mentee>) {
    mentees.forEach(mentee => {
      this.menteeService.get_grade_point_averages(mentee.menteeId).subscribe(data => {
        let gpas = data;

        if (gpas.length > 0) {
          let sortedGpas = _.sortBy(gpas, 'period_id').reverse();
          mentee.gpa = sortedGpas[0].gpa;
        }
      });
    });
  }
}
