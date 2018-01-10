import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component
({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit
{

    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
    }

    ngOnInit() { }

    private logout(): void
    {
        this.http.post('./logout.php', '').subscribe(res =>
        {
            if (res.status === 200)
            {
                sessionStorage.removeItem('currentUser');
                this.router.navigateByUrl('/login');
            }
        });
    }
}
