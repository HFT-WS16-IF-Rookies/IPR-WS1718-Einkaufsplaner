import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component
({
    selector: 'app-nav-bar-household',
    templateUrl: './nav-bar-household.component.html',
    styleUrls: ['./nav-bar-household.component.css']
})
export class NavBarHouseholdComponent implements OnInit
{
    private router: Router;
    private route: ActivatedRoute;

    constructor(router: Router, route: ActivatedRoute)
    {
        this.router = router;
        this.route = route;
    }

    ngOnInit() { }

    private navigateTo(page: number):void
    {
        let id = this.route.snapshot.paramMap.get('id');
        let destination: string = '/household/' + id;

        switch (page)
        {
            case 1:
                destination += '/articles';
                break;

            case 2:
                destination += '/settings';
                break;
        }

        this.router.navigateByUrl(destination);

    }

}
