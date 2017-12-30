import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Component
({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
    private email: string;
    private password: string;
    private errorMsg: string;
    private http: Http;
    private router: Router;
    // private data: {[key: string]: string;};

    constructor(http: Http, router: Router)
    {
        this.email = "";
        this.password = "";
        this.http = http;
        this.router = router;
    }

    ngOnInit()
    {
        if (sessionStorage.getItem('currentUser') !== null)
        {
            this.router.navigateByUrl('/dashboard');
        }
    }

    private submit(): void
    {
        this.errorMsg = "";

        if (this.email === "")
        {
            this.errorMsg += "Keine E-Mail eingegeben!<br>";
        }

        if(this.password === "")
        {
            this.errorMsg += "Kein Passwort eingegeben<br>";
        }

        if (this.errorMsg !== "")
        {
            return;
        }

        let data: {[key: string]: string;} = {};
        data['email'] = this.email;
        data['password'] = this.password;

        this.http.post('./login.php', JSON.stringify(data))
            .subscribe(res =>
            {
                if (res.status !== 200)
                {
                    return;
                }

                if (res.json().state === "error")
                {
                    this.errorMsg = res.json().text;
                }

                if (res.json().state === "success")
                {
                    let response: {[key: string]: string;} = res.json();
                    delete response.state;
                    sessionStorage.setItem('currentUser', JSON.stringify(response));
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

}
