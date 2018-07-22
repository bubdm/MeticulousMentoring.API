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
var classification_service_1 = require("../classification/classification.service");
var educationSystem_service_1 = require("../educationSystem/educationSystem.service");
var mentee_service_1 = require("../mentee/mentee.service");
var guardian_service_1 = require("../guardian/guardian.service");
var school_service_1 = require("../school/school.service");
var MenteeFormComponent = (function () {
    function MenteeFormComponent(dialogRef, data, formBuilder, classificationService, educationSystemService, menteeService, guardianService, schoolService) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.classificationService = classificationService;
        this.educationSystemService = educationSystemService;
        this.menteeService = menteeService;
        this.guardianService = guardianService;
        this.schoolService = schoolService;
        this.startDate = new Date(1999, 0, 1);
        this.isChildAddressShared = false;
    }
    MenteeFormComponent.prototype.ngOnInit = function () {
        this.getClassifications();
        this.getEducationSystems();
        this.getSchools();
        this.firstFormGroup = this.formBuilder.group({
            first_name: ["", forms_1.Validators.required],
            last_name: ["", forms_1.Validators.required],
            address1: ["", forms_1.Validators.required],
            address2: [""],
            city: ["", forms_1.Validators.required],
            zip: ["", forms_1.Validators.required],
            email: ["", [forms_1.Validators.required, forms_1.Validators.email]],
            menteeGender: ["", forms_1.Validators.required],
            dob: ["", forms_1.Validators.required]
        });
        this.secondFormGroup = this.formBuilder.group({
            school: ["", forms_1.Validators.required],
            classification: ["", forms_1.Validators.required]
        });
        this.thirdFormGroup = this.formBuilder.group({
            guardianFirstName: ["", forms_1.Validators.required],
            guardianLastName: ["", forms_1.Validators.required],
            guardianGender: ["", forms_1.Validators.required],
            guardianAddress1: ["", forms_1.Validators.required],
            guardianAddress2: [""],
            guardianCity: ["", forms_1.Validators.required],
            guardianZip: ["", forms_1.Validators.required],
            guardianEmail: ["", forms_1.Validators.required]
        });
    };
    MenteeFormComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
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
            this.thirdFormGroup.controls['guardianAddress1'].setValue(this.firstFormGroup.get('address1').value);
            this.thirdFormGroup.controls['guardianAddress2'].setValue(this.firstFormGroup.get('address2').value);
            this.thirdFormGroup.controls['guardianCity'].setValue(this.firstFormGroup.get('city').value);
            this.thirdFormGroup.controls['guardianZip'].setValue(this.firstFormGroup.get('zip').value);
        }
        else {
            this.thirdFormGroup.controls['guardianAddress1'].setValue('');
            this.thirdFormGroup.controls['guardianAddress2'].setValue('');
            this.thirdFormGroup.controls['guardianCity'].setValue('');
            this.thirdFormGroup.controls['guardianZip'].setValue('');
        }
    };
    MenteeFormComponent.prototype.submitMentee = function () {
        var _this = this;
        var test = this.firstFormGroup.value;
        var test2 = this.secondFormGroup.value;
        var test3 = this.thirdFormGroup.value;
        var newMentee = {
            MenteeFirstName: test.first_name,
            MenteeLastName: test.last_name,
            MenteeAddress: {
                address1: test.address1,
                address2: test.address2,
                city: test.city,
                zip: test.zip,
            },
            MenteeDOB: test.dob,
            MenteeEmail: test.email,
            MenteeGender: test.menteeGender,
            MenteeClassification: {
                id: test2.classification.classificationId,
                classification_id: test2.classification.classificationClassId,
                description: test2.classification.classificationDescription
            },
            MenteeSchool: {
                id: test2.school.schoolId
            },
        };
        var response = this.menteeService.add_mentee(newMentee)
            .subscribe(function (data) {
            _this.menteeId = data.menteeId;
            var newGuardian = {
                GuardianFirstName: test3.guardianFirstName,
                GuardianLastName: test3.guardianLastName,
                GuardianGender: test3.guardianGender,
                GuardianAddress: {
                    address1: test3.guardianAddress1,
                    address2: test3.guardianAddress2,
                    city: test3.guardianCity,
                    zip: test3.guardianZip
                },
                GuardianEmail: test3.guardianEmail,
                GuardianChildren: [{
                        id: _this.menteeId
                    }]
            };
            _this.guardianService.add_guardian(newGuardian)
                .subscribe(function (r) { });
            _this.menteeService.totalMentees;
        }, function (error) { return console.log(error); });
    };
    return MenteeFormComponent;
}());
MenteeFormComponent = __decorate([
    core_1.Component({
        selector: 'mentee-form',
        templateUrl: 'mentee.form.component.html',
        styleUrls: ['mentee.form.component.css']
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [typeof (_a = typeof material_1.MatDialogRef !== "undefined" && material_1.MatDialogRef) === "function" && _a || Object, Object, typeof (_b = typeof forms_1.FormBuilder !== "undefined" && forms_1.FormBuilder) === "function" && _b || Object, classification_service_1.ClassificationService,
        educationSystem_service_1.EducationSystemService,
        mentee_service_1.MenteeService,
        guardian_service_1.GuardianService,
        school_service_1.SchoolService])
], MenteeFormComponent);
exports.MenteeFormComponent = MenteeFormComponent;
var _a, _b;
//# sourceMappingURL=mentee.form.component.js.map