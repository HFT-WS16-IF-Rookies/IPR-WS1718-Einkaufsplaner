import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from '../Registration';
import { Http } from '@angular/http';

@Component
({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class currentUser
{
    firstName: string;
    lastName: string;
    email: string;
    password: string;

    constructor()
    {
        let currentUser = sessionStorage.getItem('currentUser');
        this.firstName = currentUser['firstName'];
        this.lastName = currentUser['lastName'];
        this.email = "";
        this.password = "";
    }
}

export class ProfileComponent implements OnInit
{
    private http: Http;
    private router: Router;
    private liveUser: currentUser;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
        this.liveUser = new currentUser;
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

        this.liveUser.password = this.change.passwordConfirm;

        this.http.post('changeCredentials.php', JSON.stringify(this.liveUser))
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

        this.liveUser.email = this.change.emailConfirm;

        this.http.post('changeCredentials.php', JSON.stringify(this.liveUser))
        .subscribe(res =>
        {
            if(res.json().state === "error")
            {
                this.errorMsgMail = res.json().text;
            }
        });
    }

}
