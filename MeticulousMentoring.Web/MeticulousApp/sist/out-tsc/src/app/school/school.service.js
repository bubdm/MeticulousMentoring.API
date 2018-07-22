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
var user_service_1 = require("../shared/user.service");
var operators_1 = require("rxjs/operators");
var SchoolService = /** @class */ (function () {
    function SchoolService(http, userService) {
        this.http = http;
        this.userService = userService;
    }
    SchoolService.prototype.get_schools = function () {
        return this.http.get("http://localhost:5005/api/schools", {
            headers: new http_1.Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
        })
            .pipe(operators_1.map(function (res) { return res.json(); }));
    };
    SchoolService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http, user_service_1.UserService])
    ], SchoolService);
    return SchoolService;
}());
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map