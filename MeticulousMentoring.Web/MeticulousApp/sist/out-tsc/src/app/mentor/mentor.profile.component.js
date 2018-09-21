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
var router_1 = require("@angular/router");
var mentee_service_1 = require("../shared/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var timeline_service_1 = require("../shared/timeline.service");
var underscore_1 = require("underscore");
var material_1 = require("@angular/material");
var mentor_1 = require("../models/mentor");
var mentee_dialog_component_1 = require("../mentee-dialog/mentee-dialog.component");
require("rxjs/Rx");
var MentorProfileComponent = /** @class */ (function () {
    function MentorProfileComponent(menteeService, mentorService, timelineService, userService, router, dialog) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.timelineService = timelineService;
        this.userService = userService;
        this.router = router;
        this.dialog = dialog;
        this.mentor = new mentor_1.Mentor();
        this.messages = 0;
        this.timelineData = [];
        this.mentorMentees = new Array();
    }
    MentorProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        if (!this.user) {
            this.router.navigate([""]);
        }
        else {
            this.mentorId = this.user.iat;
            this.mentorService.get_mentor_by_id(this.mentorId)
                .subscribe(function (data) {
                _this.mentor = data;
                _this.mentorMentees = (_this.mentor.mentorMentees);
                _this.addMenteeCurrentGpa(_this.mentorMentees);
            }, function (error) { return console.log(error); });
        }
        this.timelineService.get_timeline_data(this.mentorId)
            .subscribe(function (data) {
            _this.timelineData = (data);
        }, function (error) { return console.log(error); });
    };
    MentorProfileComponent.prototype.openMenteeFormDialog = function (mId) {
        var _this = this;
        var dialogRef = this.dialog.open(mentee_dialog_component_1.MenteeDialogComponent, {
            width: '1400px',
            height: '860px',
            data: { menteeId: mId }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.mentee = result;
        });
    };
    MentorProfileComponent.prototype.addMenteeCurrentGpa = function (mentees) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                mentees.forEach(function (mentee) {
                    _this.menteeService.get_grade_point_averages(mentee.menteeId).subscribe(function (data) {
                        var gpas = data;
                        if (gpas.length > 0) {
                            var sortedGpas = underscore_1._.sortBy(gpas, 'period_id').reverse();
                            mentee.gpa = sortedGpas[0].gpa;
                        }
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    MentorProfileComponent = __decorate([
        core_1.NgModule({
            imports: [mentee_dialog_component_1.MenteeDialogComponent]
        }),
        core_1.Component({
            selector: 'mentor-profile',
            templateUrl: './mentor.profile.component.html',
            styleUrls: ['./mentor.profile.component.css']
        }),
        __metadata("design:paramtypes", [mentee_service_1.MenteeService,
            mentor_service_1.MentorService,
            timeline_service_1.TimelineService,
            user_service_1.UserService,
            router_1.Router,
            material_1.MatDialog])
    ], MentorProfileComponent);
    return MentorProfileComponent;
}());
exports.MentorProfileComponent = MentorProfileComponent;
//# sourceMappingURL=mentor.profile.component.js.map