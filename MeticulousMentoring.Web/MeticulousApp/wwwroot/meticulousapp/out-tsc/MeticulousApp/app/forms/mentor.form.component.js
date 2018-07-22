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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var mentee_service_1 = require("../mentee/mentee.service");
var mentor_service_1 = require("../mentor/mentor.service");
var MentorFormComponent = (function () {
    function MentorFormComponent(dialogRef, data, formBuilder, menteeService, mentorService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.menteeService = menteeService;
        this.mentorService = mentorService;
    }
    MentorFormComponent.prototype.ngOnInit = function () {
        this.getAllMentees();
        this.firstFormGroup = this.formBuilder.group({
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
        this.dialogRef.close();
    };
    MentorFormComponent.prototype.getAllMentees = function () {
        var _this = this;
        var response = this.menteeService.get_mentees()
            .subscribe(function (data) {
            _this.mentees = data;
        }, function (error) { return console.log(error); });
    };
    MentorFormComponent.prototype.submitMentor = function () {
        var mentorDto = this.firstFormGroup.value;
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
            .subscribe(function (data) { });
    };
    return MentorFormComponent;
}());
MentorFormComponent = __decorate([
    core_1.Component({
        selector: 'mentor-form',
        templateUrl: 'mentor.form.component.html',
        styleUrls: ['mentor.form.component.css']
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _a || Object, Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object, mentee_service_1.MenteeService,
        mentor_service_1.MentorService])
], MentorFormComponent);
exports.MentorFormComponent = MentorFormComponent;
var _a, _b;
//# sourceMappingURL=mentor.form.component.js.map