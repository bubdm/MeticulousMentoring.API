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
var accountservice_1 = require("../../shared/accountservice");
var Subject_1 = require("rxjs/Subject");
var UsersService = /** @class */ (function () {
    function UsersService(accountService) {
        this.accountService = accountService;
        this.users$ = new Subject_1.Subject();
        this.get_users_with_roles();
    }
    UsersService.prototype.get_users_with_roles = function () {
        var _this = this;
        this.accountService.get_users_with_roles().subscribe(function (data) { return _this.users$.next(data); });
    };
    UsersService.prototype.notify_users_with_roles_changed = function () {
        this.get_users_with_roles();
    };
    UsersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [accountservice_1.AccountService])
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map