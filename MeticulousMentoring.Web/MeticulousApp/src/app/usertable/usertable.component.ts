import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { AccountService } from '../shared/accountservice';
import { DataSource } from '@angular/cdk/collections';
import { IUser } from '../interfaces/iuser';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
    selector: 'meticulous-usertable',
    templateUrl: './usertable.component.html',
    styleUrls: ['./usertable.component.css']
})
export class UsertableComponent implements OnInit {
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns = ['id', 'userName'];

    constructor(private accountService: AccountService) { }
    ngOnInit() {
        this.accountService.get_users()
            .subscribe(
            data => {
                this.dataSource.data = data;
            },
            error => console.log()
            );
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
}
