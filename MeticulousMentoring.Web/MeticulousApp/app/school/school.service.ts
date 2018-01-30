import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class SchoolService {
    constructor(private http: Http, private userService: UserService) { }

    public get_schools() {
        return this.http.get("http://localhost:52373/api/schools",
                {
                    headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
                })
            .map((res: Response) => res.json());
    }
}