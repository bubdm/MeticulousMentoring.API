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
var mentee_service_1 = require("../shared/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var modal_1 = require("ngx-bootstrap/modal");
var users_service_1 = require("../dashboard/users/users.service");
require("../../assets/script.js");
var MentorFormComponent = /** @class */ (function () {
    function MentorFormComponent(formBuilder, menteeService, mentorService, bsModalRef, usersService) {
        this.formBuilder = formBuilder;
        this.menteeService = menteeService;
        this.mentorService = mentorService;
        this.bsModalRef = bsModalRef;
        this.usersService = usersService;
        this.mentees = [];
        this.genders = [{ gender: "M", description: "Male" },
            { gender: "F", description: "Female" }];
        // Settings configuration
        this.dropdownSettings = {};
        this.selectedItems = [];
    }
    MentorFormComponent.prototype.ngOnInit = function () {
        this.dropdownSettings = {
            text: "Select Mentee(s)",
            selectAllText: "Select All",
            unSelectAllText: "UnSelect All",
            primaryKey: "menteeId",
            labelKey: 'menteeFirstName'
        };
        this.getAllMentees();
        this.mentorForm = this.formBuilder.group({
            first_name: ["", forms_1.Validators.required],
            last_name: ["", forms_1.Validators.required],
            address1: ["", forms_1.Validators.required],
            address2: [""],
            city: ["", forms_1.Validators.required],
            zip: ["", forms_1.Validators.required],
            mentorGender: ["", forms_1.Validators.required],
            mentees: [""]
        });
    };
    MentorFormComponent.prototype.onNoClick = function () {
    };
    MentorFormComponent.prototype.getAllMentees = function () {
        var _this = this;
        var response = this.menteeService.get_mentees()
            .subscribe(function (data) {
            _this.mentees = data;
        }, function (error) { return console.log(error); });
    };
    MentorFormComponent.prototype.submitMentor = function () {
        var _this = this;
        var mentorDto = this.mentorForm.value;
        var newMentor = {
            MentorFirstName: mentorDto.first_name,
            MentorLastName: mentorDto.last_name,
            MentorAddress: {
                address1: mentorDto.address1,
                address2: mentorDto.address2,
                city: mentorDto.city,
                zip: mentorDto.zip
            },
            MentorGender: mentorDto.mentorGender,
            MentorMentees: mentorDto.mentees
        };
        var response = this.mentorService.add_mentor(newMentor)
            .subscribe(function (data) {
            _this.hide_modal();
            _this.usersService.notify_users_with_roles_changed();
        });
    };
    MentorFormComponent.prototype.hide_modal = function () {
        this.bsModalRef.hide();
    };
    MentorFormComponent.prototype.onItemSelect = function (item) {
        console.log(item);
        console.log(this.selectedItems);
    };
    MentorFormComponent.prototype.OnItemDeSelect = function (item) {
        console.log(item);
        console.log(this.selectedItems);
    };
    MentorFormComponent.prototype.onSelectAll = function (items) {
        console.log(items);
    };
    MentorFormComponent.prototype.onDeSelectAll = function (items) {
        console.log(items);
    };
    MentorFormComponent = __decorate([
        core_1.Component({
            selector: 'mentor-form',
            templateUrl: 'mentor.form.component.html',
            styleUrls: ['mentor.form.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            mentee_service_1.MenteeService,
            mentor_service_1.MentorService,
            modal_1.BsModalRef,
            users_service_1.UsersService])
    ], MentorFormComponent);
    return MentorFormComponent;
}());
exports.MentorFormComponent = MentorFormComponent;
//# sourceMappingURL=mentor.form.component.js.map