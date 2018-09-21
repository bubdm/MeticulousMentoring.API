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
var user_service_1 = require("../../shared/user.service");
var modal_1 = require("ngx-bootstrap/modal");
var router_1 = require("@angular/router");
var users_service_1 = require("./users.service");
var material_1 = require("@angular/material");
var mentee_form_component_1 = require("../../forms/mentee.form.component");
var mentor_form_component_1 = require("../../forms/mentor.form.component");
var director_form_component_1 = require("../../forms/director.form.component");
var admin_form_component_1 = require("../../forms/admin-form.component");
var screenstatus_1 = require("../../enums/screenstatus");
var UsersComponent = /** @class */ (function () {
    /** users ctor */
    function UsersComponent(usersService, userService, accountService, router, dialog, modalService) {
        this.usersService = usersService;
        this.userService = userService;
        this.accountService = accountService;
        this.router = router;
        this.dialog = dialog;
        this.modalService = modalService;
        this.user_to_delete_id = -1;
        this.ScreenType = screenstatus_1.ScreenStatus;
        this.users = new Array();
        this.usersService.notify_users_with_roles_changed();
    }
    UsersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var newUser = this.userService.get();
        if (newUser) {
            this.user = newUser;
        }
        else {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this.role = this.user.role;
        this.usersService.users$.subscribe(function (data) {
            _this.users = data;
            switch (_this.role) {
                case "Director":
                    _this.users = data.filter(function (x) { return x.role === "Mentor" || x.role === "Mentee"; });
                    break;
                default:
            }
        });
    };
    UsersComponent.prototype.openMenteeFormDialog = function () {
        var initialState = {
            mentee: this.mentee
        };
        this.bsModalRef = this.modalService.show(mentee_form_component_1.MenteeFormComponent, { initialState: initialState, "class": 'modal-lg', animated: false });
    };
    UsersComponent.prototype.openMentorFormDialog = function () {
        var initialState = {
            mentor: this.mentor
        };
        this.bsModalRef =
            this.modalService.show(mentor_form_component_1.MentorFormComponent, { initialState: initialState, "class": 'modal-lg', animated: false });
    };
    UsersComponent.prototype.openDirectorFormDialog = function () {
        var initialState = {
            title: "Director"
        };
        this.bsModalRef =
            this.modalService.show(director_form_component_1.DirectorFormComponent, { initialState: initialState, animated: false });
    };
    UsersComponent.prototype.openAdminFormDialog = function () {
        var initialState = {
            title: "Admin"
        };
        this.bsModalRef = this.modalService.show(admin_form_component_1.AdminFormComponent, { initialState: initialState, animated: false });
    };
    UsersComponent.prototype.open_delete_modal = function (template, user) {
        this.user_to_delete_id = user.id;
        this.user_to_delete = user;
        this.bsModalRef = this.modalService.show(template, { class: 'modal-sm', ignoreBackdropClick: true });
    };
    UsersComponent.prototype.confirm_user_delete = function () {
        var _this = this;
        this.accountService.deleteUser(this.user_to_delete_id).subscribe(function (data) {
            _this.bsModalRef.hide();
            _this.usersService.notify_users_with_roles_changed();
        });
    };
    UsersComponent = __decorate([
        core_1.NgModule({
            imports: [mentee_form_component_1.MenteeFormComponent,
                mentor_form_component_1.MentorFormComponent,
                director_form_component_1.DirectorFormComponent,
                admin_form_component_1.AdminFormComponent]
        }),
        core_1.Component({
            selector: 'users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css']
        })
        /** users component*/
        ,
        __metadata("design:paramtypes", [users_service_1.UsersService,
            user_service_1.UserService,
            accountservice_1.AccountService,
            router_1.Router,
            material_1.MatDialog,
            modal_1.BsModalService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map