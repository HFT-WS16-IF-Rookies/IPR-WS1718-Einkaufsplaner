import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-household',
    templateUrl: './household.component.html',
    styleUrls: ['./household.component.css']
})
export class HouseholdComponent implements OnInit
{
    private http: Http;
    private router: Router;
    private route: ActivatedRoute;

    constructor(http: Http, router: Router, route: ActivatedRoute)
    {
        this.http = http;
        this.router = router;
        this.route = route;
    }

    ngOnInit()
    {
        if(sessionStorage.getItem('currentUser') === null)
        {
            this.router.navigateByUrl('/login');
        }

        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');
        this.http.post('./getActiveHouseholdPurchases.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
        });

        this.http.post('./getNeededArticles.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
        });
    }

}
