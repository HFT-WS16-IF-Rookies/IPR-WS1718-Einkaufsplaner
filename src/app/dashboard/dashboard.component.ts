import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { Purchase } from '../Purchase';

class Household
{
    private name: string;
    private id: number;

    constructor(name: string, id: number)
    {
        this.name = name;
        this.id = id;
    }
}

@Component
({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit
{
    private http: Http;
    private router: Router;
    private purchases: Purchase[];
    private households: Household[];

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

        let data:{[key: string]: string;} = {};
        data['ID'] = JSON.parse(sessionStorage.getItem('currentUser'))['userID'];
        this.http.post('./getUserPurchases.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
            if(res.status !== 200)
            {
                return;
            }
            if(res.json().metaData.state === "success")
            {
                let temp = res.json();
                delete temp.metaData;

                this.purchases = new Array((Object.keys(temp)).length);
                let i = 0;

                for(let key in temp)
                {
                    this.purchases[i] = new Purchase(
                        temp[key].createDate,
                        temp[key].store,
                        (temp[key].store + " - " + temp[key].createDate),
                        null,
                        temp[key].purchaseID
                    );
                    i++;
                }
                console.log(this.purchases);
            }
        });

        this.http.post('./getHouseholdName.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
            if(res.status !== 200)
            {
                return;
            }
            if(res.json().metaData.state === "success")
            {
                let temp = res.json();
                delete temp.metaData;

                this.households = new Array((Object.keys(temp)).length);
                let i = 0;
                for(let key in temp)
                {
                    this.households[i] = new Household(
                        temp[key].name,
                        temp[key].householdID
                    );
                    i++;
                }
            }
        });
    }

    private createPurchase():void
    {
        this.router.navigateByUrl('/purchaseCreate');
    }

    private createHousehold():void
    {
        this.router.navigateByUrl('/householdCreate');
    }
}
