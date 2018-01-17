import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Purchase } from '../Purchase';
import { NeededArticle } from '../NeededArticle';

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
    private purchases: Purchase[];
    private needed: NeededArticle[];
    private stores: String[];
    private id: String;

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
        this.id = this.route.snapshot.paramMap.get('id');

        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');
        this.http.post('./getActiveHouseholdPurchases.php', JSON.stringify(data)).subscribe(res =>
        {
            if (res.status !== 200)
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
                        temp[key].user
                    );
                    i++;
                }
            }
        });

        this.http.post('./getNeededArticles.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
            if (res.status !== 200)
            {
                return;
            }

            if(res.json().metaData.state === "success")
            {
                let temp = res.json();
                delete temp.metaData;

                this.needed = new Array((Object.keys(temp)).length);
                let i = 0;

                for(let key in temp)
                {
                    this.needed[i] = new NeededArticle(
                        temp[key].name,
                        +temp[key].neededAmount
                    );
                    i++;
                }
            }
        });

        this.http.post('./getStores.php', JSON.stringify(data)).subscribe(res =>
        {
            console.log(res.json());
            if (res.status !== 200)
            {
                return;
            }

            if(res.json().metaData.state === "success")
            {
                let temp = res.json();
                delete temp.metaData;

                this.stores = new Array((Object.keys(temp)).length);
                let i = 0;

                for(let key in temp)
                {
                    this.stores[i] = temp[key].name;

                    console.log(key);
                    i++;
                }
            }
        });
    }

}
