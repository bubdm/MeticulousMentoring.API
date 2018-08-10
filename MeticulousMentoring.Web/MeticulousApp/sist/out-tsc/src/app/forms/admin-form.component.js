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
var forms_1 = require("@angular/forms");
var modal_1 = require("ngx-bootstrap/modal");
var users_service_1 = require("../dashboard/users/users.service");
var accountservice_1 = require("../shared/accountservice");
var adminview_1 = require("../models/adminview");
var AdminFormComponent = /** @class */ (function () {
    /** admin.form ctor */
    function AdminFormComponent(formBuilder, accountService, bsModalRef, usersService) {
        this.formBuilder = formBuilder;
        this.accountService = accountService;
        this.bsModalRef = bsModalRef;
        this.usersService = usersService;
        this.admin = new adminview_1.AdminView();
    }
    AdminFormComponent.prototype.ngOnInit = function () {
        this.adminForm = this.formBuilder.group({
            first_name: ["", forms_1.Validators.required],
            last_name: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required]
        });
    };
    AdminFormComponent.prototype.submitAdmin = function () {
        var _this = this;
        var adminDto = this.adminForm.value;
        this.admin.adminFirstName = adminDto.first_name;
        this.admin.adminLastName = adminDto.last_name;
        this.admin.adminEmail = adminDto.email;
        var response = this.accountService.add_admin(this.admin).subscribe(function (data) {
            _this.hide_modal();
            _this.usersService.notify_users_with_roles_changed();
        });
    };
    AdminFormComponent.prototype.hide_modal = function () {
        this.bsModalRef.hide();
    };
    AdminFormComponent = __decorate([
        core_1.Component({
            selector: 'admin-form',
            templateUrl: './admin-form.component.html',
            styleUrls: ['./admin-form.component.css']
        })
        /** admin.form component*/
        ,
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            accountservice_1.AccountService,
            modal_1.BsModalRef,
            users_service_1.UsersService])
    ], AdminFormComponent);
    return AdminFormComponent;
}());
exports.AdminFormComponent = AdminFormComponent;
//# sourceMappingURL=admin-form.component.js.map