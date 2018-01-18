import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Article } from '../Article';

@Component
({
    selector: 'app-edit-article',
    templateUrl: './edit-article.component.html',
    styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit
{
    private http: Http;
    private router: Router;
    private route: ActivatedRoute;

    private article: Article;
    private stores: {[key: string]: string;}[];

    constructor(http: Http, router: Router, route: ActivatedRoute)
    {
        this.http = http;
        this.router = router;
        this.route = route;
    }

    ngOnInit()
    {
        this.getStores();

        let articleID = this.route.snapshot.paramMap.get('articleID');
        let request: {[key: string]: string} = {};
        request['articleID'] = articleID;
        this.http.post('./getArticle.php', JSON.stringify(request)).subscribe(res =>
        {
            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            switch(metaData.state)
            {
                case 'success':
                    this.article = new Article(
                        jsonData.article.name,
                        jsonData.article.store,
                        jsonData.article.currentAmount,
                        jsonData.article.minAmount,
                        jsonData.article.maxAmount,
                        jsonData.article.priority,
                        jsonData.article.articleID
                    );
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

    private saveArticle(priority: string, storeIndex: number):void
    {
        let data: {[key: string]: string;} = {};
        data['articleID'] = ""+this.article.id;
        data['name'] = this.article.name;
        data['storeID'] = this.stores[storeIndex]['storeID'];

        data['currentAmount'] = ""+this.article.currentAmount;
        data['minAmount'] = ""+this.article.minAmount;
        data['maxAmount'] = ""+this.article.maxAmount;
        data['priority'] = priority;

        this.http.post('./updateArticle.php', JSON.stringify(data)).subscribe(res =>
        {
            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            switch (metaData.state)
            {
                case 'success':
                    let householdID = this.route.snapshot.paramMap.get('id');
                    this.router.navigateByUrl('/household/' + householdID + '/articles');
                    break;

                case 'error':
                    break;
            }
        });
    }

}
