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
var accountservice_1 = require("../shared/accountservice");
var user_service_1 = require("../shared/user.service");
var router_1 = require("@angular/router");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var AdminComponent = (function () {
    function AdminComponent(userService, auth, router, menteeService, mentorService) {
        this.userService = userService;
        this.auth = auth;
        this.router = router;
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.total_mentees = 0;
        this.total_unmatched_mentees = 0;
        this.total_mentors = 0;
        this.total_male = 0;
        this.total_female = 0;
        this.math = Math;
    }
    AdminComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.menteeService.get_total_mentees()
            .subscribe(function (data) {
            _this.total_mentees = data.length;
            _this.total_male = data.filter(function (element) { return element.menteeGender === 'M'; }).length;
            _this.total_female = data.filter(function (element) { return element.menteeGender === 'F'; }).length;
        });
        this.mentorService.get_mentors()
            .subscribe(function (data) {
            _this.total_mentors = data.length;
        });
        this.menteeService.get_mentees()
            .subscribe(function (data) {
            _this.total_unmatched_mentees = data.length;
        });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        selector: "admin-dashboard",
        templateUrl: "admin.component.html",
        styleUrls: ["admin.component.css"]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService,
        accountservice_1.AccountService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, mentee_service_1.MenteeService,
        mentor_service_1.MentorService])
], AdminComponent);
exports.AdminComponent = AdminComponent;
var _a;
//# sourceMappingURL=admin.component.js.map