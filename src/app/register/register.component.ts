import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../Registration';
import { Router } from '@angular/router'
import { Http } from '@angular/http';
import { PasswordHasher } from '../PasswordHasher';

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
    private registration: Registration;
    @Input() private userPassword1: string;
    @Input() private userPassword2: string;
    private errorMsg: string;
    private http: Http;
    private router: Router;

    constructor(http: Http, router: Router)
    {
        this.registration = new Registration();
        this.userPassword1 = "";
        this.userPassword2 = "";
        this.errorMsg = "";
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

    submit():void
    {
        // reset error messages
        this.errorMsg = "";

        // check if name is empty
        if (this.registration.firstName === "")
        {
            this.errorMsg += "Bitte Vorname eingeben<br/>";
        }

        if (this.registration.lastName === "")
        {
            this.errorMsg += "Bitte Nachname eingeben<br/>";
        }

        // check if email is given
        if (this.registration.email === "")
        {
            this.errorMsg += "Bitte E-Mail Addresse eingeben<br/>";
        }
        // if email is given, check if it's a valid email address
        else
        {
            //TO-DO: check with a regex for vaild email
        }

        // check if a password is given
        if (this.userPassword1 === "")
        {
            this.errorMsg += "Bitte Passwort angeben<br/>";
        }

        // compare the two passwords
        if (this.userPassword1 !== this.userPassword2)
        {
            this.errorMsg += "Die Passwörter stimmen nicht überein.<br/>"
            this.userPassword2 = "";
        }

        // if errorMsg isn't empty, we had something to complain, so we won't bother our server
        if (this.errorMsg !== "")
        {
            return;
        }

        this.registration.password = PasswordHasher.hashPassword(this.userPassword1);

        this.http.post('register.php', JSON.stringify(this.registration)).subscribe(res =>
        {
            let jsonData = res.json();
            let metaData = jsonData.metaData;
            delete jsonData.metaData;

            switch(metaData.state)
            {
                case 'error':
                    this.errorMsg = metaData.text;
                    break;

                case 'success':
                    let data: {[key: string]: string} = {};
                    data.email = this.registration.email;
                    data.password = this.registration.password;

                    this.http.post('login.php', JSON.stringify(data)).subscribe(resLogin =>
                    {
                        let jsonDataLogin = resLogin.json();
                        let metaDataLogin = jsonDataLogin.metaData;
                        delete jsonDataLogin.metaData;

                        switch(metaDataLogin.state)
                        {
                            case 'success':
                                sessionStorage.setItem('currentUser', JSON.stringify(jsonDataLogin.user));
                                this.router.navigateByUrl('/dashboard');
                                break;
                        }
                    });
                    break;
            }
        });
    }

}
