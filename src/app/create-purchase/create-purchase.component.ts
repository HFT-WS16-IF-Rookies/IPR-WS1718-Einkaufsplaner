import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-create-purchase',
  templateUrl: './create-purchase.component.html',
  styleUrls: ['./create-purchase.component.css']
})
export class CreatePurchaseComponent implements OnInit {

    private http: Http;
    private router: Router;
    private route: ActivatedRoute;
    private stores: {[key: string]: string;}[];
    private households: {[key: string]: string;}[];

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

        this.http.post('./getStores.php', JSON.stringify(data)).subscribe(res =>
        {
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
                    this.stores[i] = {};
                    this.stores[i]['name'] = temp[key].name;
                    this.stores[i]['storeID'] = temp[key].storeID;
                    i++;
                }
            }
        });

        data['ID'] = JSON.parse(sessionStorage.getItem('currentUser'))['userID'];
        this.http.post('./getHouseholdName.php', JSON.stringify(data)).subscribe(res =>
        {
            if (res.status !== 200)
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
                    this.households[i] = {};
                    this.households[i]['name'] = temp[key].name;
                    this.households[i]['householdID'] = temp[key].householdID;
                    i++;
                }
            }
        });
    }

    private makePurchase(storeIndex: number, householdIndex: number): void
    {
        let data: {[key: string]: {[key: string]: string;};} = {};
        let user: {[key: string]: string} = {};
        user['ID'] = JSON.parse(sessionStorage.getItem('currentUser'))['userID'];
        data['user'] = user;
        data['store'] = this.stores[storeIndex];
        data['household'] = this.households[householdIndex];
        console.log(data);
        console.log(JSON.stringify(data));
        this.http.post('./makePurchase.php', JSON.stringify(data)).subscribe(res =>
        {
            if(res.json().metaData.state === "success")
            {
                this.router.navigateByUrl('/purchase/' + res.json().metaData.id);
            }
        });
    }
}
