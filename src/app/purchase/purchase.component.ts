import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit
{

    private http: Http;
    private router: Router;
    private route: ActivatedRoute;
    private articles: {[key: string]: {[key: string]: string}};

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
            this.router.navigateByUrl('/login')
        }

        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');
        this.http.post('./getPurchaseData.php', JSON.stringify(data)).subscribe(res =>
        {
            if (res.status !== 200)
            {
                return;
            }

            if(res.json().metaData.state === "success")
            {
                let temp: {[key: string]: string};
                delete res.json().metaData
                for(let key in res.json())
                {
                    temp["name"] = res.json().key.name;
                    articles[res.json().key] = temp;
                    temp["amount"] = res.json().key.amount;
                    articles[res.json().key] = temp;
                    temp["found"] = res.json().key.found;
                    articles[res.json().key] = temp;

                }
            }


        })
    }

    private closePurchase(): void
    {
        let id = this.route.snapshot.paramMap.get('id');
        // this.http.post('./closePurchase.php', JSON(data))
    }

}
