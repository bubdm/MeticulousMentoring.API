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
var operators_1 = require("rxjs/operators");
var user_service_1 = require("./user.service");
var MenteeService = /** @class */ (function () {
    function MenteeService(http, userService, httpClient) {
        this.http = http;
        this.userService = userService;
        this.httpClient = httpClient;
    }
    MenteeService.prototype.get_mentees = function () {
        return this.http.get("http://localhost:5005/api/mentees", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    MenteeService.prototype.get_total_mentees = function () {
        return this.http.get("http://localhost:5005/api/mentees/totalmentees", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).pipe(operators_1.map(function (res) { return res.json(); }));
    };
    MenteeService.prototype.add_mentee = function (mentee) {
        return this.http.post("http://localhost:5005/api/mentees", mentee, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        }).pipe(operators_1.map(function (res) { return res.json(); }));
    };
    MenteeService.prototype.get_mentee_by_id = function (menteeId) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/mentees/" + menteeId, httpOptions);
    };
    MenteeService.prototype.get_mentor_by_mentee_id = function (menteeId) {
        return this.http.get("http://localhost:5005/api/mentees/GetMentor/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    MenteeService.prototype.get_guardian_by_mentee_id = function (menteeId) {
        return this.http.get("http://localhost:5005/api/mentees/GetGuardian/" + menteeId, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    MenteeService.prototype.get_mentee_grades = function (menteeId) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/mentees/MenteeGrades/" + menteeId, httpOptions);
    };
    MenteeService.prototype.add_mentee_grades = function (grades) {
        return this.http.post("http://localhost:5005/api/mentees/AddGrades", grades, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        });
    };
    MenteeService.prototype.get_grade_point_average = function (id, period) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/mentees/GradePointAverage/" + id + "/" + period, httpOptions);
    };
    MenteeService.prototype.get_grade_point_averages = function (id) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/mentees/GradePointAverages/" + id, httpOptions);
    };
    MenteeService.prototype.get_all_averages_for_user = function (classificationId) {
        var httpOptions = {
            headers: new http_2.HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + localStorage.getItem('token').toString()
            })
        };
        return this.httpClient.get("http://localhost:5005/api/mentees/GetAllAveragesForUser/" + classificationId, httpOptions);
    };
    MenteeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService, http_2.HttpClient])
    ], MenteeService);
    return MenteeService;
}());
exports.MenteeService = MenteeService;
//# sourceMappingURL=mentee.service.js.map