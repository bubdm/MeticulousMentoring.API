import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { GradingService } from "../shared/grading.service";
import { TimelineService } from '../shared/timeline.service';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { IUser } from '../interfaces/iuser';
import { MenteeService } from '../mentee/mentee.service';
import { MentorService } from '../mentor/mentor.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
//import * as _ from 'lodash';
import { _ } from "underscore";

@Component({
    selector: "mentee-profile",
    templateUrl: "mentee.profile.component.html",
    styleUrls: ["mentee.profile.component.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenteeProfileComponent implements OnInit {
    public user: IUser;
    public mentee = {};
    public menteeId;
    public mentor = {};
    public guardian = {};
    public grades = [];
    public gradeGroup = {};
    public messages: number = 1;
    public timelineData = {};
    public gradingPeriods = [];
    public blankGrades = [];
    public courses = [];
    public system_id = 0;
    public classification_id = 0;
    public myForm: FormGroup;

    constructor(private menteeService: MenteeService,
        private mentorService: MentorService,
        private userService: UserService,
        private timelineService: TimelineService,
        private router: Router,
        private gradingService: GradingService,
        private _fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.myForm = this._fb.group({
            grades: this._fb.array([])
        });
        if (!this.user) {
            this.router.navigate([""]);
        } else {
            this.menteeId = this.user.iat;

            this.gradingService.get_grading_periods()
                .subscribe(data => {
                    this.gradingPeriods = data;
                });

            this.menteeService.get_mentee_by_id(this.menteeId)
                .subscribe(data => {
                    this.mentee = data;
                    this.system_id = data.menteeSchool.system.id;
                    this.classification_id = data.menteeClassification.id;

                    this.gradingService.get_courses_by_systemid(this.system_id, this.classification_id)
                        .subscribe(data => {
                            this.courses = data;
                        });
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

                    //TODO Modify underscore js sortby
                    this.grades = _.chain(data)
                        .groupBy(data, value => value.gradePeriod.description)
                        .map((group, key) => {
                            return {
                                Period: key,
                                Courses: _.chain(group)
                                    .groupBy(data, value => value.gradeCourse.course_name)
                                    .map((group, key) => {
                                        return {
                                            Course: key
                                        };
                                    }).value()
                            }
                        }).value();
                    //this.grades = _.groupBy(this.grades, value => value.gradePeriod.description);
                },
                error => console.log(error));

            this.timelineService.get_timeline_data(this.menteeId)
                .subscribe(data => {
                    this.timelineData = data;
                },
                error => console.log(error));
        }
    }

    public add_blank_grade() {
        const control = <FormArray>this.myForm.controls['grades'];
        control.push(this._fb.group({
            period: ['', Validators.required],
            course: ['', Validators.required],
            value: ['', Validators.required]
        }));
    }

    public removeGrade(i: number) {
        const control = <FormArray>this.myForm.controls['grades'];
        control.removeAt(i);
    }

    public save_grades(form) {
        var grades = form.value.grades;
        var new_grades = [];

        grades.forEach(grade => {
            new_grades.push({
                course_id: grade.course,
                mentee_id: this.menteeId,
                grade_value: grade.value,
                period_id: grade.period,
                school_year: '2017-2018'
            });
        });

        this.menteeService.add_mentee_grades(new_grades)
            .subscribe(r => {
            });

        const control = <FormArray>this.myForm.controls['grades'];
        while (control.length !== 0) {
            this.removeGrade(0);
        }
    }
}