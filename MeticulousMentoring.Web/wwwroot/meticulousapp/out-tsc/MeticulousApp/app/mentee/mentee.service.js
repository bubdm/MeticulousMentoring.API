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
require("rxjs/add/operator/startWith");
require("rxjs/add/observable/merge");
require("rxjs/add/operator/map");
var user_service_1 = require("../shared/user.service");
var MenteeService = (function () {
    function MenteeService(http, userService) {
        this.http = http;
        this.userService = userService;
    }
    MenteeService.prototype.get_mentees = function () {
        return this.http.get("http://localhost:52373/api/mentees", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    MenteeService.prototype.get_total_mentees = function () {
        return this.http.get("http://localhost:52373/api/mentees/totalmentees", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    MenteeService.prototype.add_mentee = function (mentee) {
        return this.http.post("http://localhost:52373/api/mentees", mentee, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).map(function (res) { return res.json(); });
    };
    MenteeService.prototype.get_mentee_by_id = function (menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    MenteeService.prototype.get_mentor_by_mentee_id = function (menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/GetMentor/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    MenteeService.prototype.get_guardian_by_mentee_id = function (menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/GetGuardian/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    MenteeService.prototype.get_mentee_grades = function (menteeId) {
        return this.http.get("http://localhost:52373/api/mentees/MenteeGrades/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .map(function (res) { return res.json(); });
    };
    return MenteeService;
}());
MenteeService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
], MenteeService);
exports.MenteeService = MenteeService;
//# sourceMappingURL=mentee.service.js.map