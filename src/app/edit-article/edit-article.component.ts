import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/core';
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

    constructor(http: Http, router: Router, route: ActivatedRoute)
    {
        this.http = http;
        this.router = router;
        this.route = route;
    }

    ngOnInit()
    {
        let articleID = this.route.snapshot.paramMap.get('articleID');
        let request: {[key: string]: string} = {};
        request['articleID'] = articleID;
        this.http.post('./getArticle.php', JSON.stringify(request)).subscribe(res =>
        {
            console.log(res.json());
        });
    }

}
