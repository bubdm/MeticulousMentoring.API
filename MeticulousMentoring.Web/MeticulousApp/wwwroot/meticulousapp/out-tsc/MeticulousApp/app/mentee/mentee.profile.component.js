"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../shared/user.service");
var grading_service_1 = require("../shared/grading.service");
var timeline_service_1 = require("../shared/timeline.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
require("rxjs/Rx");
//import * as _ from 'lodash';
var underscore_1 = require("underscore");
var MenteeProfileComponent = (function () {
    function MenteeProfileComponent(menteeService, mentorService, userService, timelineService, router, gradingService, _fb) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.userService = userService;
        this.timelineService = timelineService;
        this.router = router;
        this.gradingService = gradingService;
        this._fb = _fb;
        this.mentee = {};
        this.mentor = {};
        this.guardian = {};
        this.grades = [];
        this.gradeGroup = {};
        this.messages = 1;
        this.timelineData = {};
        this.gradingPeriods = [];
        this.blankGrades = [];
        this.courses = [];
        this.system_id = 0;
        this.classification_id = 0;
    }
    MenteeProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.myForm = this._fb.group({
            grades: this._fb.array([])
        });
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            this.menteeId = this.user.iat;
            this.gradingService.get_grading_periods()
                .subscribe(function (data) {
                _this.gradingPeriods = data;
            });
            this.menteeService.get_mentee_by_id(this.menteeId)
                .subscribe(function (data) {
                _this.mentee = data;
                _this.system_id = data.menteeSchool.system.id;
                _this.classification_id = data.menteeClassification.id;
                _this.gradingService.get_courses_by_systemid(_this.system_id, _this.classification_id)
                    .subscribe(function (data) {
                    _this.courses = data;
                });
            }, function (error) { return console.log(error); });
            this.menteeService.get_mentor_by_mentee_id(this.menteeId)
                .subscribe(function (data) {
                _this.mentor = data;
            }, function (error) { return console.log(error); });
            this.menteeService.get_guardian_by_mentee_id(this.menteeId)
                .subscribe(function (data) {
                _this.guardian = data;
            }, function (error) { return console.log(error); });
            this.menteeService.get_mentee_grades(this.menteeId)
                .subscribe(function (data) {
                _this.grades = data;
                //TODO Modify underscore js sortby
                _this.grades = underscore_1._.chain(data)
                    .groupBy(data, function (value) { return value.gradePeriod.description; })
                    .map(function (group, key) {
                    return {
                        Period: key,
                        Courses: underscore_1._.chain(group)
                            .groupBy(data, function (value) { return value.gradeCourse.course_name; })
                            .map(function (group, key) {
                            return {
                                Course: key
                            };
                        }).value()
                    };
                }).value();
                //this.grades = _.groupBy(this.grades, value => value.gradePeriod.description);
            }, function (error) { return console.log(error); });
            this.timelineService.get_timeline_data(this.menteeId)
                .subscribe(function (data) {
                _this.timelineData = data;
            }, function (error) { return console.log(error); });
        }
    };
    MenteeProfileComponent.prototype.add_blank_grade = function () {
        var control = this.myForm.controls['grades'];
        control.push(this._fb.group({
            period: ['', forms_1.Validators.required],
            course: ['', forms_1.Validators.required],
            value: ['', forms_1.Validators.required]
        }));
    };
    MenteeProfileComponent.prototype.removeGrade = function (i) {
        var control = this.myForm.controls['grades'];
        control.removeAt(i);
    };
    MenteeProfileComponent.prototype.save_grades = function (form) {
        var _this = this;
        var grades = form.value.grades;
        var new_grades = [];
        grades.forEach(function (grade) {
            new_grades.push({
                course_id: grade.course,
                mentee_id: _this.menteeId,
                grade_value: grade.value,
                period_id: grade.period,
                school_year: '2017-2018'
            });
        });
        this.menteeService.add_mentee_grades(new_grades)
            .subscribe(function (r) {
        });
        var control = this.myForm.controls['grades'];
        while (control.length !== 0) {
            this.removeGrade(0);
        }
    };
    return MenteeProfileComponent;
}());
MenteeProfileComponent = __decorate([
    core_1.Component({
        selector: "mentee-profile",
        templateUrl: "mentee.profile.component.html",
        styleUrls: ["mentee.profile.component.css"],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [mentee_service_1.MenteeService,
        mentor_service_1.MentorService,
        user_service_1.UserService,
        timeline_service_1.TimelineService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, grading_service_1.GradingService, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object])
], MenteeProfileComponent);
exports.MenteeProfileComponent = MenteeProfileComponent;
var _a, _b;
//# sourceMappingURL=mentee.profile.component.js.map