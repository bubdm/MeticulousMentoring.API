"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
var testing_1 = require("@angular/core/testing");
var platform_browser_1 = require("@angular/platform-browser");
var users_component_1 = require("./users.component");
var component;
var fixture;
describe('users component', function () {
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [users_component_1.UsersComponent],
            imports: [platform_browser_1.BrowserModule],
            providers: [
                { provide: testing_1.ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = testing_1.TestBed.createComponent(users_component_1.UsersComponent);
        component = fixture.componentInstance;
    }));
    it('should do something', testing_1.async(function () {
        expect(true).toEqual(true);
    }));
});
//# sourceMappingURL=users.component.spec.js.map