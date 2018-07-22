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
var user_service_1 = require("../shared/user.service");
var router_1 = require("@angular/router");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var material_1 = require("@angular/material");
var mentee_dialog_component_1 = require("../mentee-dialog/mentee-dialog.component");
require("rxjs/Rx");
var MentorProfileComponent = (function () {
    function MentorProfileComponent(menteeService, mentorService, userService, router, dialog) {
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.userService = userService;
        this.router = router;
        this.dialog = dialog;
        this.mentor = {};
        this.messages = 0;
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
            }, function (error) { return console.log(error); });
        }
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
    return MentorProfileComponent;
}());
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
        user_service_1.UserService, typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, typeof (_b = typeof material_1.MatDialog !== "undefined" && material_1.MatDialog) === "function" && _b || Object])
], MentorProfileComponent);
exports.MentorProfileComponent = MentorProfileComponent;
var _a, _b;
//# sourceMappingURL=mentor.profile.component.js.map