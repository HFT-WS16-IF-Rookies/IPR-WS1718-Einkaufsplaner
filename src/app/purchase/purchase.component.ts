import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component
({
    selector: 'app-purchase',
    templateUrl: './purchase.component.html',
    styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router) 
    {
        this.http = http;
        this.router = router;
    }

    ngOnInit() {
    }

}
