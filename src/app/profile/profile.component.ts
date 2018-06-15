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
    private statusMsgMail: string;
    private statusMsgPassword: string;

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
        this.statusMsgPassword = "";

        if(this.password === "")
        {
            this.statusMsgPassword = "Bitte Passwort eingeben";
        }

        if(this.passwordConfirm === "")
        {
            this.statusMsgPassword = "Bitte Passwort bestätigen";
        }

        if(this.password != this.passwordConfirm)
        {
            this.statusMsgPassword = "Passwörte stimmen nicht überein";
            this.passwordConfirm = "";
        }

        if(this.statusMsgPassword != "")
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
                    this.statusMsgPassword = res.json().metaData.text;
                }
                else if (res.json().metaData.state === "success")
                {
                    this.statusMsgPassword = "Passwort geändert!";
                }
            });
    }

    private submitMail(): void
    {
        this.statusMsgMail = "";

        if(this.email === "")
        {
            this.statusMsgMail = "Bitte Email-Adresse eingeben";
        }

        if(this.emailConfirm === "")
        {
            this.statusMsgMail = "Bitte Email-Adresse bestätigen";
        }

        if(this.email != this.emailConfirm)
        {
            this.statusMsgMail = "Email-Adressen stimmen nicht überein";
            this.emailConfirm = "";
        }

        if(this.statusMsgMail != "")
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
                this.statusMsgMail = res.json().metaData.text;
            }
        });
    }
}
