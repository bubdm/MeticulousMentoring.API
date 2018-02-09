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
var router_1 = require("@angular/router");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
require("rxjs/Rx");
var MenteeProfileComponent = (function () {
    function MenteeProfileComponent(menteeService, mentorService, userService, router) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.userService = userService;
        this.router = router;
        this.mentee = {};
        this.mentor = {};
        this.guardian = {};
        this.grades = {};
        this.gradeGroup = {};
        this.messages = 1;
    }
    MenteeProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            this.menteeId = this.user.iat;
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
        }
    };
    return MenteeProfileComponent;
}());
MenteeProfileComponent = __decorate([
    core_1.Component({
        selector: "mentee-profile",
        templateUrl: "mentee.profile.component.html",
        styleUrls: ["mentee.profile.component.css"]
    }),
    __metadata("design:paramtypes", [mentee_service_1.MenteeService,
        mentor_service_1.MentorService,
        user_service_1.UserService,
        router_1.Router])
], MenteeProfileComponent);
exports.MenteeProfileComponent = MenteeProfileComponent;
//# sourceMappingURL=mentee.profile.component.js.map