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
var material_1 = require("@angular/material");
var mentee_form_component_1 = require("../forms/mentee.form.component");
var mentor_form_component_1 = require("../forms/mentor.form.component");
var director_form_component_1 = require("../forms/director.form.component");
var DashboardComponent = (function () {
    function DashboardComponent(userService, auth, router, dialog) {
        this.userService = userService;
        this.auth = auth;
        this.router = router;
        this.dialog = dialog;
        this.isExpanded = false;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        //this.user = this.userService.get();
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            this.role = this.user.role;
            if (this.user.role === "Admin") {
                this.getUsers();
            }
        }
    };
    DashboardComponent.prototype.getUsers = function () {
        var _this = this;
        var response = this.auth.get_users()
            .subscribe(function (data) {
            _this.users = new material_1.MatTableDataSource(data);
        }, function (error) { return console.log(error); });
    };
    DashboardComponent.prototype.openMenteeFormDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(mentee_form_component_1.MenteeFormComponent, {
            width: '800px',
            height: '780px',
            data: { mentee: this.mentee }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.mentee = result;
        });
    };
    DashboardComponent.prototype.openMentorFormDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(mentor_form_component_1.MentorFormComponent, {
            width: '800px',
            height: '780px'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.mentor = result;
        });
    };
    DashboardComponent.prototype.openDirectorFormDialog = function () {
        var diaglogRef = this.dialog.open(director_form_component_1.DirectorFormComponent, {
            width: '800px',
            height: '400px'
        });
        diaglogRef.afterClosed().subscribe(function (result) { });
    };
    DashboardComponent.prototype.logout = function () {
        this.auth.logout();
        this.router.navigate([""]);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.NgModule({
        imports: [mentee_form_component_1.MenteeFormComponent,
            mentor_form_component_1.MentorFormComponent,
            director_form_component_1.DirectorFormComponent]
    }),
    core_1.Component({
        selector: "dashboard",
        templateUrl: "dashboard.component.html",
        styleUrls: ["dashboard.component.css"]
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, accountservice_1.AccountService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _b || Object])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
var _a, _b;
//# sourceMappingURL=dashboard.component.js.map