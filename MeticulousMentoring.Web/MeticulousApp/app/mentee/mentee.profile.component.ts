import { Component, OnInit } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as _ from 'lodash';

@Component({
    selector: "mentee-profile",
    templateUrl: "mentee.profile.component.html",
    styleUrls: ["mentee.profile.component.css"]
})
export class MenteeProfileComponent implements OnInit {
    public user: IUser;
    public mentee = {};
    public menteeId;
    public mentor = {};
    public guardian = {};
    public grades = {};
    public gradeGroup = {};
    public messages: number = 1;

    constructor(private menteeService: MenteeService,
        private mentorService: MentorService,
        private userService: UserService,
        private router: Router) { }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        } else {
            this.menteeId = this.user.iat;

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
        }
    }
}