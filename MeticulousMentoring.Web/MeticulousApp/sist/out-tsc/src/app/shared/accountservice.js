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
var http_2 = require("@angular/common/http");
var core_1 = require("@angular/core");
//import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
var angular_jwt_1 = require("@auth0/angular-jwt");
var operators_1 = require("rxjs/operators");
var user_service_1 = require("../shared/user.service");
require("rxjs/add/operator/map");
var AccountService = /** @class */ (function () {
    function AccountService(http, userService, httpClient) {
        this.http = http;
        this.userService = userService;
        this.httpClient = httpClient;
        this.token = "";
        this.jwtHelper = new angular_jwt_1.JwtHelperService();
    }
    Object.defineProperty(AccountService.prototype, "loginRequired", {
        get: function () {
            return this.token.length === 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    AccountService.prototype.loggedIn = function () {
        var token = localStorage.getItem('token');
        return this.jwtHelper.isTokenExpired(token);
    };
    AccountService.prototype.login = function (creds) {
        return this.http.post("http://localhost:5005/api/account/createtoken", creds)
            .pipe(operators_1.map(function (res) { return res.json(); }));
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
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    AccountService.prototype.get_users_with_roles = function () {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/account/GetUserWithRoles", httpOptions);
    };
    AccountService.prototype.add_admin = function (admin) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.post("http://localhost:5005/api/account/AddAdmin", admin, httpOptions);
    };
    AccountService.prototype.deleteUser = function (id) {
        return this.http.delete("http://localhost:5005/api/account/deleteUser/" + id, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).pipe();
    };
    AccountService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService, http_2.HttpClient])
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=accountservice.js.map