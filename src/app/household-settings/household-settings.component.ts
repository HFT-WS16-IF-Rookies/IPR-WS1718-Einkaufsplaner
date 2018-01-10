import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-household-settings',
    templateUrl: './household-settings.component.html',
    styleUrls: ['./household-settings.component.css']
})
export class HouseholdSettingsComponent implements OnInit
{
    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
    }

    ngOnInit()
    {
        if(sessionStorage.getItem('currentUser') === null)
        {
            this.router.navigateByUrl('/login')
        }
    }

}
