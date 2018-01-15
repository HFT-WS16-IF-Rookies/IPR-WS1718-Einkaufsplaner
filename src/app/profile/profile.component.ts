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

export class ProfileComponent implements OnInit
{

    private http: Http;
    private router: Router;
    private liveUser: Registration;
    @Input() private passwordConfirm: string;
    @Input() private emailConfirm: string;
    private errorMsgMail: string;
    private errorMsgPassword: string;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
        this.liveUser = new Registration();

        let currentUser = sessionStorage.getItem('currentUser');
        this.liveUser.firstName = currentUser['firstName'];
        this.liveUser.lastName = currentUser['lastName'];
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

        if(this.liveUser.password === "")
        {
            this.errorMsgPassword = "Bitte Passwort eingeben";
        }

        if(this.passwordConfirm === "")
        {
            this.errorMsgPassword = "Bitte Passwort bestätigen";
        }

        if(this.liveUser.password != this.passwordConfirm)
        {
            this.errorMsgPassword = "Passwörte stimmen nicht überein";
            this.passwordConfirm = "";
        }

        if(this.errorMsgPassword != "")
        {
            return;
        }

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

        if(this.liveUser.email === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse eingeben";
        }

        if(this.emailConfirm === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse bestätigen";
        }

        if(this.liveUser.email != this.emailConfirm)
        {
            this.errorMsgMail = "Email-Adressen stimmen nicht überein";
            this.emailConfirm = "";
        }

        if(this.errorMsgMail != "")
        {
            return;
        }

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
