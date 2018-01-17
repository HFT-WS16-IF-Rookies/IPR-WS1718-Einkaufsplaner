import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Article } from '../Article';

@Component
({
    selector: 'app-household-article-management',
    templateUrl: './household-article-management.component.html',
    styleUrls: ['./household-article-management.component.css']
})
export class HouseholdArticleManagementComponent implements OnInit
{
    private http: Http;
    private router: Router;
    private route: ActivatedRoute;
    private articles: Article[];
    private newName: string;
    private newStore: string;
    private newCurrentAmount: number;
    private newMinAmount: number;
    private newMaxAmount: number;
    private stores: {[key: string]: string;}[];


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

        getArticles();
        getStores();

    }

    public getArticles():void
    {
        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');

        this.http.post('./getHouseholdArticles.php', JSON.stringify(data)).subscribe(res =>
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
                    this.articles[i] = new Article(
                        temp[key].name,
                        temp[key].storeName,
                        temp[key].currentAmount,
                        temp[key].minAmount,
                        temp[key].maxAmount,
                        temp[key].priority
                    );
                    i++;
                }
            }
        });
    }

    public addArticle(priority: string, storeIndex: number):void
    {
        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');
        data['name'] = newName;
        if(storeIndex === -1)
        {
            data['storeID'] = newStore;
        }
        else
        {
            data['storeID'] = stores
        }

        data['currentAmount'] = newCurrentAmount;
        data['minAmount'] = newMinAmount;
        data['maxAmount'] = newMaxAmount;
        data['priority'] = priority;

        this.http.post('./addHouseholdArticles.php', JSON.stringify(data)).subscribe(res =>
        {
            if(res.json().metaData.state === "success")
            {
                getArticles();
                getStores();
            }
        });

    }

    public getStores():void
    {
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
    }
}
