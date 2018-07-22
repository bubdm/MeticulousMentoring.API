import { Component } from '@angular/core';
import { JwtHelper } from "angular2-jwt";
import { AccountService } from "../shared/accountservice";
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ["login.component.css"]
})
export class LoginComponent {
    public creds = {
        username: "",
        password: ""
    };

    constructor(private auth: AccountService, private userService: UserService, private router: Router) { }

    private jwtHelper: JwtHelper = new JwtHelper();

    onLogin() {
        let response = this.auth.login(this.creds)
            .subscribe(
            data => {
                localStorage.setItem('token', data.token);
                this.userService.set(this.jwtHelper.decodeToken(data.token));
                localStorage.setItem('user', JSON.stringify(this.jwtHelper.decodeToken(data.token)));
                this.router.navigate(["dashboard"]);
            },
            error => console.log(error));
    }
}