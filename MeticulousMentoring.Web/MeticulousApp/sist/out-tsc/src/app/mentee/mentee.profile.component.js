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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../shared/user.service");
var grading_service_1 = require("../shared/grading.service");
var timeline_service_1 = require("../shared/timeline.service");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var mentee_service_1 = require("../shared/mentee.service");
var mentee_profile_service_1 = require("../mentee/mentee.profile.service");
var mentor_service_1 = require("../mentor/mentor.service");
var mentee_1 = require("../models/mentee");
var mentor_1 = require("../models/mentor");
var guardian_1 = require("../models/guardian");
var gradepointaverage_1 = require("../models/gradepointaverage");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var Highcharts = require("highcharts");
require("rxjs/Rx");
//import * as _ from 'lodash';
var underscore_1 = require("underscore");
var MenteeProfileComponent = /** @class */ (function () {
    function MenteeProfileComponent(menteeService, mentorService, userService, timelineService, router, gradingService, _fb, menteeProfileService) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.userService = userService;
        this.timelineService = timelineService;
        this.router = router;
        this.gradingService = gradingService;
        this._fb = _fb;
        this.menteeProfileService = menteeProfileService;
        this.mentee = new mentee_1.Mentee();
        this.Highcharts = Highcharts;
        this.chartOptions = {
            series: [
                {
                    data: [1, 2, 3, 4, 5, 6]
                }
            ]
        };
        this.mentor = new mentor_1.Mentor();
        this.guardian = new guardian_1.Guardian();
        this.grades = new Array();
        this.gpas = new Array();
        this.gradeGroup = {};
        this.messages = 1;
        this.timelineData = [];
        this.gradingPeriods = new Array();
        this.allPeriods = [];
        this.allSiteAverages = [];
        this.lineChartData = new Array();
        this.lineChartLabels = new Array();
        this.lineChartOptions = { responsive: true };
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.chartColors = [
            {
                backgroundColor: 'rgba(225,10,24,0.2)',
                borderColor: 'rgba(225,10,24,0.2)',
                pointBackgroundColor: 'rgba(225,10,24,0.2)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(225,10,24,0.2)'
            },
            {
                backgroundColor: 'rgba(225,10,24,0.2)',
                borderColor: 'rgba(225,10,24,0.2)',
                pointBackgroundColor: 'rgba(225,10,24,0.2)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(225,10,24,0.2)'
            }
        ];
        //ngx
        this.view = [700, 400];
        this.multi = [];
        this.showXAxis = true;
        this.showYAxis = true;
        this.gradient = false;
        this.showLegend = false;
        this.showXAxisLabel = true;
        this.xAxisLabel = 'Subject';
        this.showYAxisLabel = true;
        this.yAxisLabel = 'GPA';
        this.colorScheme = {
            domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
        };
        this.autoScale = true;
        this.blankGrades = [];
        this.courses = [];
        this.labels = [];
        this.system_id = 0;
        this.classification_id = 0;
        this.isShown = false;
        this.selectedPeriod = '-1';
        this.menteeProfileService.notify_change_in_grades();
    }
    MenteeProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.myForm = this._fb.group({
            grades: this._fb.array([])
        });
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            this.menteeId = this.user.iat;
            this.addGpas();
            this.getMentee(this.menteeId);
            this.menteeService.get_mentor_by_mentee_id(this.menteeId)
                .subscribe(function (data) {
                _this.mentor = data;
            }, function (error) { return console.log(error); });
            this.menteeService.get_guardian_by_mentee_id(this.menteeId)
                .subscribe(function (data) {
                _this.guardian = data;
            }, function (error) { return console.log(error); });
            this.menteeProfileService.mentee_grades$.subscribe(function (data) {
                _this.grades = data;
                _this.getMenteeGrades();
            }, function (error) { return console.log(error); });
            this.menteeProfileService.notify_change_in_grades();
            this.timelineService.get_timeline_data(this.menteeId)
                .subscribe(function (data) {
                _this.timelineData = data;
            }, function (error) { return console.log(error); });
        }
    };
    MenteeProfileComponent.prototype.add_blank_grade = function () {
        var control = this.myForm.controls['grades'];
        control.push(this._fb.group({
            period: [''],
            course: ['', forms_1.Validators.required],
            value: ['', forms_1.Validators.required]
        }));
    };
    MenteeProfileComponent.prototype.removeGrade = function (i) {
        var control = this.myForm.controls['grades'];
        control.removeAt(i);
    };
    MenteeProfileComponent.prototype.getPeriodGpa = function (id, period) {
        var _this = this;
        var period_id = period[0].gradePeriod.id;
        var userGpa = new gradepointaverage_1.GradePointAverage();
        userGpa = this.gpas.filter(function (x) { return x.mentee_id === parseInt(_this.menteeId) && x.period_id === period_id; })[0];
        return userGpa.gpa;
    };
    MenteeProfileComponent.prototype.getMentee = function (menteeId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menteeService.get_mentee_by_id(menteeId)
                            .subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                this.mentee = data;
                                this.system_id = this.mentee.menteeSchool.system.id;
                                this.classification_id = data.menteeClassification.id;
                                this.addSiteAverages(this.classification_id);
                                this.gradingService.get_courses_by_systemid(this.system_id, this.classification_id)
                                    .subscribe(function (data) {
                                    _this.courses = data;
                                });
                                return [2 /*return*/];
                            });
                        }); }, function (error) { return console.log(error); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenteeProfileComponent.prototype.addSiteAverages = function (classificationId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menteeService.get_all_averages_for_user(classificationId)
                            .subscribe(function (data) {
                            _this.allSiteAverages = data;
                            var aData = [];
                            var tData = [];
                            for (var i = 0; i < _this.allSiteAverages.length; i++) {
                                aData.push(_this.allSiteAverages[i].gpa);
                            }
                            _this.lineChartData.push({
                                data: aData, label: "Site Avg", backgroundColor: 'rgba(66,158,206,0.2)',
                                fill: false,
                                borderColor: 'rgba(66,158,206,0.2)',
                                pointBackgroundColor: 'rgba(66,158,206,0.2)',
                                pointBorderColor: '#fff',
                                pointHoverBackgroundColor: '#fff',
                                pointHoverBorderColor: 'rgba(66,158,206,0.2)'
                            });
                            tData = _this.lineChartData;
                            _this.chart.chart.config.data.colors = _this.chartColors;
                            _this.chart.chart.config.data.datasets = tData;
                            _this.chart.chart.update();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenteeProfileComponent.prototype.addGpas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.menteeProfileService.mentee_gpas$.subscribe(function (data) { return __awaiter(_this, void 0, void 0, function () {
                            var gData, series, i;
                            return __generator(this, function (_a) {
                                this.gpas = data;
                                gData = [];
                                series = [];
                                for (i = 0; i < this.gpas.length; i++) {
                                    gData.push(this.gpas[i].gpa);
                                }
                                this.multi.push({ name: this.user.given_name, series: series });
                                this.lineChartData.push({
                                    data: gData, label: this.user.given_name, backgroundColor: 'rgba(128,170,0,0.2)',
                                    fill: false,
                                    borderColor: 'rgba(128,170,0,0.2)',
                                    pointBackgroundColor: 'rgba(128,170,0,0.2)',
                                    pointBorderColor: '#fff',
                                    pointHoverBackgroundColor: '#fff',
                                    pointHoverBorderColor: 'rgba(128,170,0,0.2)'
                                });
                                return [2 /*return*/];
                            });
                        }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MenteeProfileComponent.prototype.getMenteeGrades = function () {
        return __awaiter(this, void 0, void 0, function () {
            var previousId, nPeriods, i, k;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.allPeriods.length < 1) {
                    previousId = 0;
                    nPeriods = underscore_1._.pluck(this.grades, 'gradePeriod');
                    for (i = 0; i < nPeriods.length; i++) {
                        if (nPeriods[i].id !== previousId) {
                            this.allPeriods.push({
                                id: nPeriods[i].id,
                                period: nPeriods[i].period,
                                description: nPeriods[i].description
                            });
                        }
                        previousId = nPeriods[i].id;
                    }
                    for (k = 0; k < this.allPeriods.length; k++) {
                        this.labels.push(this.allPeriods[k].description);
                    }
                    this.lineChartLabels = this.labels;
                    this.gradingService.get_grading_periods()
                        .subscribe(function (data) {
                        var aPeriods = _this.allPeriods;
                        for (var j = 0; j < data.length; j++) {
                            var gp = !underscore_1._.findWhere(_this.allPeriods, { id: data[j].id });
                            if (gp && _this.gradingPeriods.length < 4) {
                                _this.gradingPeriods.push(data[j]);
                            }
                        }
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    MenteeProfileComponent.prototype.save_grades = function (form) {
        var _this = this;
        var grades = form.value.grades;
        var new_grades = [];
        grades.forEach(function (grade) {
            new_grades.push({
                course_id: grade.course,
                mentee_id: _this.menteeId,
                grade_value: grade.value,
                period_id: _this.selectedPeriod,
                school_year: '2017-2018'
            });
        });
        this.menteeService.add_mentee_grades(new_grades)
            .subscribe(function (r) {
            var response = r;
            _this.menteeProfileService.notify_change_in_grades();
            _this.menteeTabs.tabs[1].active = true;
            //this.menteeTabs.tabs[3].active = true;
        });
        var control = this.myForm.controls['grades'];
        while (control.length !== 0) {
            this.removeGrade(0);
        }
    };
    __decorate([
        core_1.ViewChild('gpaChart'),
        __metadata("design:type", ng2_charts_1.BaseChartDirective)
    ], MenteeProfileComponent.prototype, "chart", void 0);
    __decorate([
        core_1.ViewChild('menteeTabs'),
        __metadata("design:type", ngx_bootstrap_1.TabsetComponent)
    ], MenteeProfileComponent.prototype, "menteeTabs", void 0);
    MenteeProfileComponent = __decorate([
        core_1.Component({
            selector: "mentee-profile",
            templateUrl: "mentee.profile.component.html",
            styleUrls: ["mentee.profile.component.css"],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [mentee_service_1.MenteeService,
            mentor_service_1.MentorService,
            user_service_1.UserService,
            timeline_service_1.TimelineService,
            router_1.Router,
            grading_service_1.GradingService,
            forms_1.FormBuilder,
            mentee_profile_service_1.MenteeProfileService])
    ], MenteeProfileComponent);
    return MenteeProfileComponent;
}());
exports.MenteeProfileComponent = MenteeProfileComponent;
//# sourceMappingURL=mentee.profile.component.js.map