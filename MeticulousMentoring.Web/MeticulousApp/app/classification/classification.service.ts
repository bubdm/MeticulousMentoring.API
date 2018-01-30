import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class ClassificationService {
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

    public get_classifications() {
        return this.http.get("http://localhost:52373/api/classification",
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }
}