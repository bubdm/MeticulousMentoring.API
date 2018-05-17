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
var GradingService = (function () {
    function GradingService(http) {
        this.http = http;
    }
    GradingService.prototype.get_grading_periods = function () {
        return this.http.get("http://localhost:5005/api/grading/GetGradingPeriods")
            .map(function (res) { return res.json(); });
    };
    GradingService.prototype.get_courses_by_systemid = function (system_id, classification_id) {
        var myParams = new http_1.URLSearchParams();
        myParams.append('system_id', system_id);
        myParams.append('classification_id', classification_id);
        var options = new http_1.RequestOptions({ params: myParams });
        return this.http.get("http://localhost:5005/api/grading/GetCoursesBySystem", options)
            .map(function (res) { return res.json(); });
    };
    return GradingService;
}());
GradingService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GradingService);
exports.GradingService = GradingService;
//# sourceMappingURL=grading.service.js.map