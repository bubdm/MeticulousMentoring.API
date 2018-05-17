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
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var director_service_1 = require("../director/director.service");
var UserchartComponent = (function () {
    function UserchartComponent(menteeService, mentorService, directorService) {
        var _this = this;
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.directorService = directorService;
        this.chartLabels = ['Mentees', 'Mentors'];
        this.chartData = [];
        this.chartType = 'pie';
        this.chartColors = [
            {
                backgroundColor: ['#f20d0d', '#ff00ff']
            }
        ];
        this.cDataMentees = 0;
        this.cDataMentors = 0;
        //this.menteeService.mentees
        //    .subscribe(d => {
        //        this.cDataMentees = d.length;
        //        this.setChartData();
        //    });
        this.mentorService.get_mentors()
            .subscribe(function (data) {
            _this.cDataMentors = data.length;
        });
    }
    UserchartComponent.prototype.ngAfterViewInit = function () {
    };
    UserchartComponent.prototype.ngOnInit = function () { };
    UserchartComponent.prototype.setChartData = function () {
        var _this = this;
        setTimeout(function () {
            _this.chartData.push(_this.cDataMentees);
            _this.chartData.push(_this.cDataMentors);
        }, 30);
    };
    return UserchartComponent;
}());
UserchartComponent = __decorate([
    core_1.NgModule({
        imports: [ng2_charts_1.ChartsModule]
    }),
    core_1.Component({
        selector: 'meticulous-userchart',
        templateUrl: './userchart.component.html',
        styleUrls: ['./userchart.component.css']
    }),
    __metadata("design:paramtypes", [mentee_service_1.MenteeService, mentor_service_1.MentorService, director_service_1.DirectorService])
], UserchartComponent);
exports.UserchartComponent = UserchartComponent;
//# sourceMappingURL=userchart.component.js.map