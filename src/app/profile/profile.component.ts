import { Component, OnInit, Input } from '@angular/core';
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
    private liveUser: {[key: string]: string;};
    @Input() private password: string;
    @Input() private passwordConfirm: string;
    @Input() private email: string;
    @Input() private emailConfirm: string;
    private errorMsgMail: string;
    private errorMsgPassword: string;

    constructor(http: Http, router: Router)
    {
        this.http = http;
        this.router = router;
        this.liveUser = {};

        let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.liveUser['userID'] = currentUser.userID;
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

        if(this.password === "")
        {
            this.errorMsgPassword = "Bitte Passwort eingeben";
        }

        if(this.passwordConfirm === "")
        {
            this.errorMsgPassword = "Bitte Passwort bestätigen";
        }

        if(this.password != this.passwordConfirm)
        {
            this.errorMsgPassword = "Passwörte stimmen nicht überein";
            this.passwordConfirm = "";
        }

        if(this.errorMsgPassword != "")
        {
            return;
        }

        this.liveUser['password'] = this.password;
        this.liveUser['change'] = 'password';

        this.http.post('changeCredentials.php', JSON.stringify(this.liveUser))
            .subscribe(res =>
            {
                if(res.json().metaData.state === "error")
                {
                    this.errorMsgPassword = res.json().metaData.text;
                }
            });
    }

    private submitMail(): void
    {
        this.errorMsgMail = "";

        if(this.email === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse eingeben";
        }

        if(this.emailConfirm === "")
        {
            this.errorMsgMail = "Bitte Email-Adresse bestätigen";
        }

        if(this.email != this.emailConfirm)
        {
            this.errorMsgMail = "Email-Adressen stimmen nicht überein";
            this.emailConfirm = "";
        }

        if(this.errorMsgMail != "")
        {
            return;
        }

        this.liveUser['email'] = this.email;
        this.liveUser['change'] = 'email';

        this.http.post('changeCredentials.php', JSON.stringify(this.liveUser))
        .subscribe(res =>
        {
            if(res.json().metaData.state === "error")
            {
                this.errorMsgMail = res.json().metaData.text;
            }
        });
    }
}
