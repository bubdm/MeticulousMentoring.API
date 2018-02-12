import { Component, OnInit, NgModule } from '@angular/core';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { MatDialog } from '@angular/material';
import { Mentee } from '../interfaces/mentee';
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
    public mentor = {};
    public mentorId;
    public messages: number = 0;
    public menteeId;

    mentee: Mentee;

    constructor(private menteeService: MenteeService,
        private mentorService: MentorService,
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
                },
                error => console.log(error));
        }
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
}