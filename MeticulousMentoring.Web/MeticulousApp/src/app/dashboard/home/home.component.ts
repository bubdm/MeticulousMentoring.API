import { Component, OnInit, NgModule, AfterViewInit } from "@angular/core";
import { AccountService } from "../../shared/accountservice";
import { UserService } from "../../shared/user.service";
import { Router } from "@angular/router";
import { User } from "../../models/user";
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
/** home component*/
export class HomeComponent implements OnInit {
  public user: User;
  public role: string;
  public defaultImage: string;

  /** home ctor */
  constructor(private userService: UserService, private accountService: AccountService, private router: Router) {
    this.defaultImage = "https://app.box.com/s/mfy8barqgf1x0bfonbag7sipo87mga64";
  }

  ngOnInit(): void {
    let newUser = this.userService.get();
    if (newUser) {
      this.user = newUser;
    } else {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
  }
}
