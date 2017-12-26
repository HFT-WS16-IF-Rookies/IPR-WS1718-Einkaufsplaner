import { Component, OnInit, Input } from '@angular/core';
import { Registration } from '../Registration';

@Component
({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit
{
    registration: Registration;

    constructor()
    {
        this.registration = new Registration();
    }

    ngOnInit(){ }

    submit():void
    {
        console.log(JSON.stringify(this.registration));
    }

}
