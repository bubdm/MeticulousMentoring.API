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
var HomeComponent = /** @class */ (function () {
    /** home ctor */
    function HomeComponent(userService, accountService, router) {
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.defaultImage = "https://app.box.com/s/mfy8barqgf1x0bfonbag7sipo87mga64";
    }
    HomeComponent.prototype.ngOnInit = function () {
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
        /** home component*/
        ,
        __metadata("design:paramtypes", [user_service_1.UserService, accountservice_1.AccountService, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map