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
    private stores: string[];
    private households: string[];

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

    private makePurchase(storeIndex: number, householdIndex: number): void
    {
        let data: {[key: string]: string;} = {};
        data['ID'] = JSON.parse(sessionStorage.getItem('currentUser'))['userID'];
        data['store'] = this.stores[storeIndex];
        data['household'] = this.households[householdIndex];
        this.http.post('./makePurchase.php', JSON.stringify(data)).subscribe(res =>
        {
            if(res.json().metaData.state === "success")
            {
                this.router.navigateByUrl('/purchase/' + res.json().metaData.id);
            }
        });
    }

}
