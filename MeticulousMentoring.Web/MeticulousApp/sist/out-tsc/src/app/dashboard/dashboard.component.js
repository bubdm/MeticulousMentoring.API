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
var $ = require("jquery/dist/jquery.min.js");
require("../../assets/script.js");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(userService, auth, router, dialog) {
        this.userService = userService;
        this.auth = auth;
        this.router = router;
        this.dialog = dialog;
        this.isExpanded = false;
    }
    DashboardComponent.prototype.ngAfterViewInit = function () {
    };
    DashboardComponent.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
                $('#content').toggleClass('active');
                $('.collapse.in').toggleClass('in');
                $('a[aria-expanded=true]').attr('aria-expanded', 'false');
            });
        });
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
    DashboardComponent.prototype.logout = function () {
        this.auth.logout();
        this.router.navigate([""]);
    };
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
        __metadata("design:paramtypes", [user_service_1.UserService, accountservice_1.AccountService, router_1.Router, material_1.MatDialog])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map