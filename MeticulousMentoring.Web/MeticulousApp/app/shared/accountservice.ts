import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class AccountService {
    constructor(private http: Http, private userService: UserService) { }

    private token: string = "";
    private tokenExpiration: Date;
    private jwtHelper: JwtHelper = new JwtHelper();

    public get loginRequired(): boolean {
        return this.token.length === 0 || this.tokenExpiration > new Date();
    }

    public loggedIn() {
        return tokenNotExpired();
    }

    public login(creds) {
        return this.http.post("http://localhost:52373/api/account/createtoken", creds)
            .map((res: Response) => res.json());
    }

    public logout() {
        this.userService.delete();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    public get_users() {
        return this.http.get("http://localhost:52373/api/account/getusers",
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            })
            .map((res: Response) => res.json());
    }
}