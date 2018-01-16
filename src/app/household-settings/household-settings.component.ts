import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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

        this.http.post('./getHouseholdMembers.php', JSON.stringify(data)).subscribe(res =>
        {
            let temp = res.json();
            console.log(temp);
            let metaData = temp.metaData;
            delete temp.metaData;

            console.log(metaData);
            console.log(temp);

            if (metaData.state === 'success')
            {

            }

        });
    }



}
