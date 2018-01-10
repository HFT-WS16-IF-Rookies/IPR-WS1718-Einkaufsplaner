import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-household-article-management',
    templateUrl: './household-article-management.component.html',
    styleUrls: ['./household-article-management.component.css']
})
export class HouseholdArticleManagementComponent implements OnInit
{

    constructor() { }

    ngOnInit()
    {
        if(sessionStorage.getItem('currentUser') === null)
        {
            this.router.navigateByUrl('/login')
        }
    }

}
