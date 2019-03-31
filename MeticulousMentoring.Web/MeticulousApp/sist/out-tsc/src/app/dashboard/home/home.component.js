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
var accountservice_1 = require("../../shared/accountservice");
var user_service_1 = require("../../shared/user.service");
var router_1 = require("@angular/router");
var users_service_1 = require("../users/users.service");
var screenstatus_1 = require("../../enums/screenstatus");
var HomeComponent = /** @class */ (function () {
    /** home ctor */
    function HomeComponent(usersService, userService, accountService, router) {
        this.usersService = usersService;
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.ScreenType = screenstatus_1.ScreenStatus;
        this.defaultImage = "https://www.dropbox.com/s/m7lteis9sb5djcb/DefaultImg.png?raw=1";
        this.users = new Array();
        this.usersService.notify_users_with_roles_changed();
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.role = this.user.role;
        this.usersService.users$.subscribe(function (data) {
            _this.activeMenteesCount = data.filter(function (x) { return x.role === "Mentee" && x.screen_status === _this.ScreenType.Successful; }).length;
            _this.activeMentorCount =
                data.filter(function (x) { return x.role === "Mentor" && x.screen_status === _this.ScreenType.Successful; }).length;
            _this.unmatchedActiveMenteesCount =
                data.filter(function (x) { return x.role === "Mentee" && x.screen_status === _this.ScreenType.Successful && x.Mentorid === null; }).length;
            _this.unmatchedActiveMentorCount =
                data.filter(function (x) { return x.role === "Mentor" && x.screen_status === _this.ScreenType.Successful && x.mentee_count < 1; })
                    .length;
            _this.menteesPendingScreening =
                data.filter(function (x) { return x.role === "Mentee" && x.screen_status === _this.ScreenType.Pending; }).length;
            _this.mentorsPendingScreening =
                data.filter(function (x) { return x.role === "Mentor" && x.screen_status === _this.ScreenType.Pending; }).length;
            _this.menteesNeedingScreening =
                data.filter(function (x) { return x.role === "Mentee" && x.screen_status === _this.ScreenType.NotStarted; }).length;
            _this.mentorsNeedingScreening =
                data.filter(function (x) { return x.role === "Mentor" && x.screen_status === _this.ScreenType.NotStarted; }).length;
            //get match percentages
            _this.menteeMatchedPercentage =
                ((_this.activeMenteesCount - _this.unmatchedActiveMenteesCount) / _this.activeMenteesCount * 100).toString() + "%";
            _this.mentorMatchedPercentage =
                ((_this.activeMentorCount - _this.unmatchedActiveMentorCount) / _this.activeMentorCount * 100).toString() + "%";
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
        /** home component*/
        ,
        __metadata("design:paramtypes", [users_service_1.UsersService, user_service_1.UserService, accountservice_1.AccountService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map