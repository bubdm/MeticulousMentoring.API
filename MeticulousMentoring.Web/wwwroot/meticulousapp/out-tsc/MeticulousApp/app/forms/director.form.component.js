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
var director_service_1 = require("../director/director.service");
var DirectorFormComponent = (function () {
    function DirectorFormComponent(diaglogRef, data, formBuilder, directorService) {
        this.diaglogRef = diaglogRef;
        this.data = data;
        this.formBuilder = formBuilder;
        this.directorService = directorService;
    }
    DirectorFormComponent.prototype.ngOnInit = function () {
        this.firstFormGroup = this.formBuilder.group({
            first_name: ["", forms_1.Validators.required],
            last_name: ["", forms_1.Validators.required],
            email: ["", forms_1.Validators.required]
        });
    };
    DirectorFormComponent.prototype.onNoClick = function () {
        this.diaglogRef.close();
    };
    DirectorFormComponent.prototype.submitDirector = function () {
        var directorDto = this.firstFormGroup.value;
        var newDirector = {
            DirectorFirstName: directorDto.first_name,
            DirectorLastName: directorDto.last_name,
            DirectorEmail: directorDto.email
        };
        var response = this.directorService.add_director(newDirector)
            .subscribe(function (data) { });
    };
    return DirectorFormComponent;
}());
DirectorFormComponent = __decorate([
    core_1.Component({
        selector: 'director-form',
        templateUrl: 'director.form.component.html',
        styleUrls: ['director.form.component.css']
    }),
    __param(1, core_1.Inject(material_1.MAT_DIALOG_DATA)),
    __metadata("design:paramtypes", [material_1.MatDialogRef, Object, forms_1.FormBuilder,
        director_service_1.DirectorService])
], DirectorFormComponent);
exports.DirectorFormComponent = DirectorFormComponent;
//# sourceMappingURL=director.form.component.js.map