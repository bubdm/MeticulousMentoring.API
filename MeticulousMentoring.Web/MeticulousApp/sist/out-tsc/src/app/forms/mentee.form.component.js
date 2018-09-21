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
var classification_service_1 = require("../classification/classification.service");
var educationSystem_service_1 = require("../educationSystem/educationSystem.service");
var mentee_service_1 = require("../shared/mentee.service");
var guardian_service_1 = require("../guardian/guardian.service");
var school_service_1 = require("../school/school.service");
var admin_service_1 = require("../shared/admin.service");
var modal_1 = require("ngx-bootstrap/modal");
var users_service_1 = require("../dashboard/users/users.service");
var MenteeFormComponent = /** @class */ (function () {
    function MenteeFormComponent(formBuilder, classificationService, educationSystemService, menteeService, guardianService, schoolService, adminService, bsModalRef, usersService) {
        this.formBuilder = formBuilder;
        this.classificationService = classificationService;
        this.educationSystemService = educationSystemService;
        this.menteeService = menteeService;
        this.guardianService = guardianService;
        this.schoolService = schoolService;
        this.adminService = adminService;
        this.bsModalRef = bsModalRef;
        this.usersService = usersService;
        this.startDate = new Date(1999, 0, 1);
        this.isChildAddressShared = false;
        this.genders = [{ gender: "M", description: "Male" },
            { gender: "F", description: "Female" }];
    }
    MenteeFormComponent.prototype.ngOnInit = function () {
        this.getClassifications();
        this.getEducationSystems();
        this.getSchools();
        this.menteeForm1 = this.formBuilder.group({
            first_name: ["", forms_1.Validators.required],
            last_name: ["", forms_1.Validators.required],
            address1: ["", forms_1.Validators.required],
            address2: [null],
            city: ["", forms_1.Validators.required],
            zip: ["", forms_1.Validators.required],
            email: ["", [forms_1.Validators.required, forms_1.Validators.email]],
            menteeGender: ["", forms_1.Validators.required],
            dob: ["", forms_1.Validators.required],
            school: ["", forms_1.Validators.required],
            classification: ["", forms_1.Validators.required],
        });
        this.menteeForm2 = this.formBuilder.group({
            guardianFirstName: ["", forms_1.Validators.required],
            guardianLastName: ["", forms_1.Validators.required],
            guardianGender: ["", forms_1.Validators.required],
            guardianAddress1: ["", forms_1.Validators.required],
            guardianAddress2: [null],
            guardianCity: ["", forms_1.Validators.required],
            guardianZip: ["", forms_1.Validators.required],
            guardianEmail: ["", forms_1.Validators.required]
        });
    };
    MenteeFormComponent.prototype.onNoClick = function () {
    };
    MenteeFormComponent.prototype.getClassifications = function () {
        var _this = this;
        var response = this.classificationService.get_classifications()
            .subscribe(function (data) {
            _this.classifications = data;
        }, function (error) { return console.log(error); });
    };
    MenteeFormComponent.prototype.getEducationSystems = function () {
        var _this = this;
        var response = this.educationSystemService.get_education_systems()
            .subscribe(function (data) {
            _this.educationSystems = data;
        }, function (error) { return console.log(error); });
    };
    MenteeFormComponent.prototype.getSchools = function () {
        var _this = this;
        var response = this.schoolService.get_schools()
            .subscribe(function (data) {
            _this.schools = data;
        }, function (error) { return console.log(error); });
    };
    MenteeFormComponent.prototype.copyAddress = function () {
        if (this.isChildAddressShared) {
            this.menteeForm2.controls['guardianAddress1'].setValue(this.menteeForm1.get('address1').value);
            this.menteeForm2.controls['guardianAddress2'].setValue(this.menteeForm1.get('address2').value);
            this.menteeForm2.controls['guardianCity'].setValue(this.menteeForm1.get('city').value);
            this.menteeForm2.controls['guardianZip'].setValue(this.menteeForm1.get('zip').value);
        }
        else {
            this.menteeForm2.controls['guardianAddress1'].setValue('');
            this.menteeForm2.controls['guardianAddress2'].setValue('');
            this.menteeForm2.controls['guardianCity'].setValue('');
            this.menteeForm2.controls['guardianZip'].setValue('');
        }
    };
    MenteeFormComponent.prototype.submitMentee = function () {
        var _this = this;
        var mentee_info = this.menteeForm1.value;
        var guardian_info = this.menteeForm2.value;
        var newMentee = {
            MenteeFirstName: mentee_info.first_name,
            MenteeLastName: mentee_info.last_name,
            MenteeAddress: {
                address1: mentee_info.address1,
                address2: mentee_info.address2,
                city: mentee_info.city,
                zip: mentee_info.zip,
            },
            MenteeDOB: mentee_info.dob,
            MenteeEmail: mentee_info.email,
            MenteeGender: mentee_info.menteeGender,
            MenteeClassification: {
                id: mentee_info.classification.classificationId,
                classification_id: mentee_info.classification.classificationClassId,
                description: mentee_info.classification.classificationDescription
            },
            MenteeSchool: {
                id: mentee_info.school.schoolId
            },
            MenteeImageFile: this.fileConst
        };
        var response = this.menteeService.add_mentee(newMentee)
            .subscribe(function (data) {
            _this.menteeId = data.menteeId;
            var newGuardian = {
                GuardianFirstName: guardian_info.guardianFirstName,
                GuardianLastName: guardian_info.guardianLastName,
                GuardianGender: guardian_info.guardianGender,
                GuardianAddress: {
                    address1: guardian_info.guardianAddress1,
                    address2: guardian_info.guardianAddress2,
                    city: guardian_info.guardianCity,
                    zip: guardian_info.guardianZip
                },
                GuardianEmail: guardian_info.guardianEmail,
                GuardianChildren: [{
                        id: _this.menteeId
                    }]
            };
            _this.guardianService.add_guardian(newGuardian)
                .subscribe(function (r) {
                _this.hide_modal();
                _this.usersService.notify_users_with_roles_changed();
            });
        }, function (error) { return console.log(error); });
    };
    MenteeFormComponent.prototype.hide_modal = function () {
        this.bsModalRef.hide();
    };
    MenteeFormComponent.prototype.onFileChanged = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var file = event.target.files[0];
            this.fileConst = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.onload = function (e) { return _this.selectedFile = reader_1.result; };
            reader_1.readAsDataURL(file);
        }
    };
    MenteeFormComponent = __decorate([
        core_1.Component({
            selector: 'mentee-form',
            templateUrl: 'mentee.form.component.html',
            styleUrls: ['mentee.form.component.css']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            classification_service_1.ClassificationService,
            educationSystem_service_1.EducationSystemService,
            mentee_service_1.MenteeService,
            guardian_service_1.GuardianService,
            school_service_1.SchoolService,
            admin_service_1.AdminService,
            modal_1.BsModalRef,
            users_service_1.UsersService])
    ], MenteeFormComponent);
    return MenteeFormComponent;
}());
exports.MenteeFormComponent = MenteeFormComponent;
//# sourceMappingURL=mentee.form.component.js.map