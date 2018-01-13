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
    let articles: {[key: string]: string;} = {};

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
    }

    private closePurchase(): void
    {
        let id = this.route.snapshot.paramMap.get('id');
        // this.http.post('./closePurchase.php', JSON(data))
    }

}
