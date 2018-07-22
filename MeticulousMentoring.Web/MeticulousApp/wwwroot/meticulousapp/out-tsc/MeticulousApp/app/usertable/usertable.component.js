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
var accountservice_1 = require("../shared/accountservice");
var material_1 = require("@angular/material");
var UsertableComponent = (function () {
    function UsertableComponent(accountService) {
        this.accountService = accountService;
        this.dataSource = new material_1.MatTableDataSource();
        this.displayedColumns = ['id', 'userName'];
    }
    UsertableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accountService.get_users()
            .subscribe(function (data) {
            _this.dataSource.data = data;
        }, function (error) { return console.log(); });
    };
    UsertableComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    return UsertableComponent;
}());
__decorate([
    core_1.ViewChild(material_1.MatPaginator),
    __metadata("design:type", typeof (_a = typeof material_1.MatPaginator !== "undefined" && material_1.MatPaginator) === "function" && _a || Object)
], UsertableComponent.prototype, "paginator", void 0);
UsertableComponent = __decorate([
    core_1.Component({
        selector: 'meticulous-usertable',
        templateUrl: './usertable.component.html',
        styleUrls: ['./usertable.component.css']
    }),
    __metadata("design:paramtypes", [accountservice_1.AccountService])
], UsertableComponent);
exports.UsertableComponent = UsertableComponent;
var _a;
//# sourceMappingURL=usertable.component.js.map