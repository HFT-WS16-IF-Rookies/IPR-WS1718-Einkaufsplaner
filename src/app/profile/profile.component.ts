import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
    }

    ngOnInit()
    {
        if(sessionStorage.getItem('currentUser') === null)
        {
            this.router.navigateByUrl('/login')
        }
    }

    private submitPassword(): void
    {
        this.errorMsgPassword = "";

        if(this.change.passowrd === "")
        {
            this.errorMsgPassword = "Bitte Passwort eingeben";
        }

        if(this.change.passwordConfirm === "")
        {
            this.errorMsgPassword = "Bitte Passwort bestätigen";
        }

        if(this.change.password != this.change.passwordConfirm)
        {
            this.errorMsgPassword = "Passwörte stimmen nicht überein";
            this.change.passwordConfirm = "";
        }

        if(this.errorMsgPassword != "")
        {
            return;
        }

        this.http.post(/*changePassowrd.php)*/, JSON.stringify(this.change.passwordConfirm))
            .subscribe(res =>
            {
                if(res.json().state === "error")
                {
                    this.errorMsgPassword = res.json().text;
                }
            });
    }

    private submitMail(): void
    {
        this.errorMsgMail = "";
        if(this.change.email === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse eingeben";
        }
        if(this.change.emailConfirm === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse bestätigen";
        }
        if(this.change.email != this.change.emailConfirm)
        {
            this.errorMsgMail = "Email-Adressen stimmen nicht überein";
            this.change.emailConfirm = "";
        }
        if(this.errorMsgMail != "")
        {
            return;
        }

        this.http.post(/*changeEMail.php*/, JSON.stringify(this.change.emailConfirm))
        .subscribe(res =>
        {
            if(res.json().state === "error")
            {
                this.errorMsgPassword = res.json().text;
            }
        });
    }

}
