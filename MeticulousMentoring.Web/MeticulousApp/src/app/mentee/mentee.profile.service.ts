import { Injectable } from '@angular/core';
import { UserService } from "../shared/user.service";
import { MenteeService } from '../shared/mentee.service';
import { Subject } from 'rxjs/Subject';
import { Mentee } from '../models/mentee';
import { Grade } from '../models/grade';
import { User } from "../models/user";
import { GradePointAverage } from '../models/gradepointaverage';

@Injectable()
export class MenteeProfileService {
  public user: User;
  public mentee_grades$ = new Subject<Array<Grade>>();
  public mentee_gpas$ = new Subject<Array<GradePointAverage>>();

  constructor(private menteeService: MenteeService, private userService: UserService) {
    this.get_mentee_grades();
    this.get_mentee_gpas();
  }

  private async get_mentee_grades() {
    this.user = JSON.parse(localStorage.getItem('user'));
    await this.menteeService.get_mentee_grades(parseInt(this.user.iat)).subscribe(data => this.mentee_grades$.next(data));
  }

  private async get_mentee_gpas() {
    this.user = JSON.parse(localStorage.getItem('user'));
    await this.menteeService.get_grade_point_averages(parseInt(this.user.iat))
      .subscribe(data => this.mentee_gpas$.next(data));
  }

  public notify_change_in_grades() {
    this.get_mentee_grades();
    //this.get_mentee_gpas();
  }
}
