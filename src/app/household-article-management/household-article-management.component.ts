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

        this.getArticles();
        this.getStores();

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
                        temp[key].priority,
                        temp[key].ID
                    );
                    i++;
                }
            }
        });
    }

    public addArticle(priority: string, storeIndex: number):void
    {
        console.log('priority = ' + priority);
        let data: {[key: string]: string;} = {};
        data['ID'] = this.route.snapshot.paramMap.get('id');
        data['name'] = this.newName;
        data['storeID'] = this.stores[storeIndex]['storeID'];

        data['currentAmount'] = ""+this.newCurrentAmount;
        data['minAmount'] = ""+this.newMinAmount;
        data['maxAmount'] = ""+this.newMaxAmount;
        data['priority'] = priority;

        this.http.post('./addArticle.php', JSON.stringify(data)).subscribe(res =>
        {
            if(res.json().metaData.state === "success")
            {
                this.getArticles();
                this.getStores();
            }
        });
    }

    private addStore():void
    {
        let data: {[key: string]: string} = {};
        data['newStoreName'] = this.newStore;
        this.http.post('./createStore.php', JSON.stringify(data)).subscribe(res =>
        {
            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            switch(metaData.state)
            {
                case 'success':
                    this.getStores();
                    break;

                case 'error':
                    break;
            }
        });
    }

    public getStores():void
    {
        this.http.post('./getStores.php', '{}').subscribe(res =>
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

    private editArticle(id: number):void
    {
        let householdID = this.route.snapshot.paramMap.get('id');
        this.router.navigateByUrl('/household/' + householdID + '/articles/edit/' + id);
    }

    private deleteArticle(id: number): void
    {
        console.log(id);
        this.http.post('./deleteArticle.php', JSON.stringify(id)).subscribe(res =>
        {
            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            switch (metaData.state)
            {
                case 'success':
                    this.getArticles();
                    break;

                case 'error':
                    break;
            }
        });
    }
}
