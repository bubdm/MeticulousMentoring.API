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
var mentee_service_1 = require("../shared/mentee.service");
var Subject_1 = require("rxjs/Subject");
var MenteeProfileService = /** @class */ (function () {
    function MenteeProfileService(menteeService, userService) {
        this.menteeService = menteeService;
        this.userService = userService;
        this.mentee_grades$ = new Subject_1.Subject();
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.get_mentee_grades(parseInt(this.user.iat));
    }
    MenteeProfileService.prototype.get_mentee_grades = function (id) {
        var _this = this;
        this.menteeService.get_mentee_grades(id).subscribe(function (data) { return _this.mentee_grades$.next(data); });
    };
    MenteeProfileService.prototype.notify_change_in_grades = function () {
        this.get_mentee_grades(parseInt(this.user.iat));
    };
    MenteeProfileService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [mentee_service_1.MenteeService, user_service_1.UserService])
    ], MenteeProfileService);
    return MenteeProfileService;
}());
exports.MenteeProfileService = MenteeProfileService;
//# sourceMappingURL=mentee.profile.service.js.map