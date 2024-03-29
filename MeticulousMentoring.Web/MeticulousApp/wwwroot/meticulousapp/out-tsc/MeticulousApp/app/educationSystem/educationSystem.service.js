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
var EducationSystemService = (function () {
    function EducationSystemService(http, userService) {
        this.http = http;
        this.userService = userService;
        this.token = "";
        this.jwtHelper = new angular2_jwt_1.JwtHelper();
    }
    Object.defineProperty(EducationSystemService.prototype, "loginRequired", {
        get: function () {
            return this.token.length === 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    EducationSystemService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    EducationSystemService.prototype.get_education_systems = function () {
        return this.http.get("http://localhost:5005/api/educationSystem", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    return EducationSystemService;
}());
EducationSystemService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object, user_service_1.UserService])
], EducationSystemService);
exports.EducationSystemService = EducationSystemService;
var _a;
//# sourceMappingURL=educationSystem.service.js.map