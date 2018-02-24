import { Http, Response, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AuthHttp, AuthConfig, tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs";
import { UserService } from "../shared/user.service";
import 'rxjs/add/operator/map';

@Injectable()
export class GuardianService {
    constructor(private http: Http, private userService: UserService) { }

    public add_guardian(guardian) {
        return this.http.post("http://localhost:5005/api/mentees/AddGuardian",
            guardian,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            })
            .map((res: Response) => res.json());
    }
}