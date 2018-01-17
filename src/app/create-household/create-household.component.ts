import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
  selector: 'app-create-household',
  templateUrl: './create-household.component.html',
  styleUrls: ['./create-household.component.css']
})

export class CreateHouseholdComponent implements OnInit
{

    private http: Http;
    private router: Router;
    @Input() private nameNewHousehold: string;
    private errorMsg: string;
    private newHousehold: {[key:string]:string;};

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
        this.newHousehold = {};

        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.newHousehold['userID'] = currentUser.userID;
    }

    ngOnInit()
    {
        if(sessionStorage.getItem('currentUser') === null)
        {
            this.router.navigateByUrl('/login')
        }
    }

    private createNewHousehold()
    {
        this.errorMsg = "";

        if(this.nameNewHousehold === "")
        {
            this.errorMsg = "Bitte Name für den Haushalt eingeben";
        }

        if(this.errorMsg !== "")
        {
            return;
        }

        this.newHousehold['name'] = this.nameNewHousehold;

        this.http.post('createHousehold.php', JSON.stringify(this.newHousehold))
            .subscribe(res =>
            {
                if(res.json().metaData.state === "error")
                {
                    this.errorMsg = res.json().metaData.text;
                }
                if(res.json().metaData.state === "success")
                {
                    this.router.navigateByUrl('/household/' + res.json().metaData.id);
                }
            });

            this.router.navigateByUrl('/dashboard');
  }

  private back()
  {
      this.router.navigateByUrl('/dashboard');
  }

}
