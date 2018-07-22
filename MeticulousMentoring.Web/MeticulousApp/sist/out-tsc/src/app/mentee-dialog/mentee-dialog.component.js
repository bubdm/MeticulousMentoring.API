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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../shared/user.service");
var router_1 = require("@angular/router");
var material_1 = require("@angular/material");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var timeline_service_1 = require("../shared/timeline.service");
require("rxjs/Rx");
var MenteeDialogComponent = /** @class */ (function () {
    function MenteeDialogComponent(menteeService, mentorService, userService, timelineService, router, data, dialogRef) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.userService = userService;
        this.timelineService = timelineService;
        this.router = router;
        this.data = data;
        this.dialogRef = dialogRef;
        this.mentee = {};
        this.mentor = {};
        this.guardian = {};
        this.grades = {};
        this.gradeGroup = {};
        this.messages = 1;
        this.timelineData = {};
    }
    MenteeDialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            if (this.user.role == 'Mentee') {
                this.menteeId = this.user.iat;
            }
            else {
                this.menteeId = this.data.menteeId;
            }
            this.menteeService.get_mentee_by_id(this.menteeId)
                .subscribe(function (data) {
                _this.mentee = data;
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
            }, function (error) { return console.log(error); });
            this.timelineService.get_timeline_data(this.menteeId)
                .subscribe(function (data) {
                _this.timelineData = data;
            }, function (error) { return console.log(error); });
        }
    };
    MenteeDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    MenteeDialogComponent = __decorate([
        core_1.Component({
            selector: 'app-mentee-dialog',
            templateUrl: './mentee-dialog.component.html',
            styleUrls: ['./mentee-dialog.component.css']
        }),
        __param(5, core_1.Inject(material_1.MAT_DIALOG_DATA)),
        __metadata("design:paramtypes", [mentee_service_1.MenteeService,
            mentor_service_1.MentorService,
            user_service_1.UserService,
            timeline_service_1.TimelineService,
            router_1.Router, Object, material_1.MatDialogRef])
    ], MenteeDialogComponent);
    return MenteeDialogComponent;
}());
exports.MenteeDialogComponent = MenteeDialogComponent;
//# sourceMappingURL=mentee-dialog.component.js.map