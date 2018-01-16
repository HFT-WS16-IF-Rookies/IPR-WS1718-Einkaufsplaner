import { Component, OnInit, Input } from '@angular/core';
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
    private members: string[];
    @Input() private newUser: string;
    private addUserErrorMsg: string;

    constructor(http: Http, router: Router, route: ActivatedRoute)
    {
        this.http = http;
        this.router = router;
        this.route = route;
        this.newUser = "";
        this.addUserErrorMsg = "";
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
            let metaData = temp.metaData;
            delete temp.metaData;
            if (metaData.state === 'success')
            {
                this.members = new Array((Object.keys(temp)).length);

                let i = 0;
                for (let key in temp)
                {
                    this.members[i] = temp[key].firstName + " " + temp[key].lastName;
                    i++;
                }
            }
        });
    }

    private addUserToHousehold():void
    {
        let data: {[key: string]: string} = {};
        if (this.newUser === "")
        {
            this.addUserErrorMsg = "Bitte E-Mail addresse eingeben";
            return;
        }


    }

}
