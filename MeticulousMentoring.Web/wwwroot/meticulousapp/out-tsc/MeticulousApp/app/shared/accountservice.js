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
var http_1 = require("@angular/http");
var core_1 = require("@angular/core");
var angular2_jwt_1 = require("angular2-jwt");
var user_service_1 = require("../shared/user.service");
require("rxjs/add/operator/map");
var AccountService = (function () {
    function AccountService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.token = "";
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    Object.defineProperty(AccountService.prototype, "loginRequired", {
        get: function () {
            return this.token.length === 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AccountService.prototype.login = function (creds) {
        return this.http.post("http://localhost:5005/api/account/createtoken", creds)
            .map(function (res) { return res.json(); });
    };
    AccountService.prototype.logout = function () {
        this.userService.delete();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };
    AccountService.prototype.get_users = function () {
        return this.http.get("http://localhost:5005/api/account/getusers", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    return AccountService;
}());
AccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=accountservice.js.map