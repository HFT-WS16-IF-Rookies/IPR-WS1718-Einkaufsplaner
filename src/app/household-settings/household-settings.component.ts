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

        this.getHouseholdMembers();
    }

    private getHouseholdMembers():void
    {
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
        if (this.newUser === "")
        {
            this.addUserErrorMsg = "Bitte E-Mail addresse eingeben";
            return;
        }

        let data: {[key: string]: string} = {};
        data['householdID'] = this.route.snapshot.paramMap.get('id');
        data['newUser'] = this.newUser;

        this.http.post('./addHouseholdMember.php', JSON.stringify(data)).subscribe(res =>
        {
            if (res.status !== 200)
            {
                return;
            }

            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            if (metaData.state === 'error')
            {
                switch(metaData.case)
                {
                    case 'user not found':
                        this.addUserErrorMsg = 'Es ist kein Benutzer mit dieser E-Mail registriert.';
                        break;

                    case 'db error':
                        this.addUserErrorMsg = "Es ist etwas in der Datenbank schiefgelaufen.";
                        break;

                    case 'user is member yet':
                        this.addUserErrorMsg = 'Hast du Tomaten auf den Augen?! Der ist schon Mitglied!';
                        break;
                }
            }

            if(metaData.state === 'success')
            {
                // this.router.navigateByUrl(this.route.snapshot['_routerState'].url);
                this.getHouseholdMembers();
            }
        });

    }

}
