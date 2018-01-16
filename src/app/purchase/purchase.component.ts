import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { PurchaseArticle } from '../PurchaseArticle';

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
    private articles: PurchaseArticle[];

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
                let temp = res.json();
                delete temp.metaData;

                this.articles = new Array((Object.keys(temp)).length);
                let i = 0;

                for(let key in temp)
                {
                    if (key !== 'metaData')
                    {
                        this.articles[i] = new PurchaseArticle(
                            res.json()[key].name,
                            +res.json()[key].amount,
                            +res.json()[key].found,
                            +res.json()[key].id,
                            +res.json()[key].articleID
                        );
                    }
                    console.log(key);
                    i++;

                }
            }


        });
    }

    private generateCheckedBoolean(article: PurchaseArticle):boolean
    {
        if (article.found < 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    private toggleFound(article: PurchaseArticle):void
    {
        if (article.found == 0)
        {
            article.found = article.amount;
        }
    }

    private closePurchase(): void
    {
        console.log(JSON.stringify(this.articles))
        this.http.post('./closePurchase.php', JSON.stringify(this.articles)).subscribe(res =>
        {
            // TO-DO: keine Ahnung
        });
    }

}
