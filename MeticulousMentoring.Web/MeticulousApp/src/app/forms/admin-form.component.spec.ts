/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AdminFormComponent } from './admin-form.component';

let component: AdminFormComponent;
let fixture: ComponentFixture<AdminFormComponent>;

describe('admin.form component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminFormComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AdminFormComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});