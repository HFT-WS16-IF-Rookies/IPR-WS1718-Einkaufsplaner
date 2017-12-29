import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../Registration';
import { Http } from '@angular/http';

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
    private registration: Registration;
    @Input() private userPassword2: string;
    private errorMsg: string;
    private http: Http;

    constructor(http: Http)
    {
        this.registration = new Registration();
        this.userPassword2 = "";
        this.errorMsg = "";
        this.http = http;
    }

    ngOnInit(){ }

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
        if (this.registration.password === "")
        {
            this.errorMsg += "Bitte Passwort angeben<br/>";
        }

        // compare the two passwords
        if (this.registration.password !== this.userPassword2)
        {
            this.errorMsg += "Die Passwörter stimmen nicht überein.<br/>"
            this.userPassword2 = "";
        }

        // if errorMsg isn't empty, we had something to complain, so we won't bother our server
        if (this.errorMsg !== "")
        {
            return;
        }

        this.http.post('register.php', JSON.stringify(this.registration))
            .subscribe(res =>
            {
                if (res.json().state === "error")
                {
                    this.errorMsg = res.json().text;
                }
            });

        // TO-DO: check if the registration was successful or there was an error server side

    }

}
