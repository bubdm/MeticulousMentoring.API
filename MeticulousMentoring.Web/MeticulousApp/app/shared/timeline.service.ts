import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import { UserService } from "../shared/user.service";

@Injectable()
export class TimelineService {
    constructor(private http: Http, private userService: UserService) { }

    public get_timeline_data(id) {
        return this.http.get("http://localhost:5005/api/timeline/" + id,
            {
                headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token').toString() })
            })
            .map((res: Response) => res.json());
    }
}