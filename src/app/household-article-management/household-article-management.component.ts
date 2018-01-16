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
}
