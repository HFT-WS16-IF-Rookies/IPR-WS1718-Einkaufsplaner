import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';


import { AppComponent } from './app.component';
import { HttpInterceptorService } from './http-interceptor.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HouseholdComponent } from './household/household.component';
import { HouseholdSettingsComponent } from './household-settings/household-settings.component';
import { HouseholdArticleManagementComponent } from './household-article-management/household-article-management.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AppRoutingModule } from './app-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CreatePurchaseComponent } from './create-purchase/create-purchase.component';
import { CreateHouseholdComponent } from './create-household/create-household.component';
import { NavBarHouseholdComponent } from './nav-bar-household/nav-bar-household.component';
import { EditArticleComponent } from './edit-article/edit-article.component';


@NgModule
({
    declarations:
    [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        DashboardComponent,
        ProfileComponent,
        HouseholdComponent,
        HouseholdSettingsComponent,
        HouseholdArticleManagementComponent,
        PurchaseComponent,
        NavBarComponent,
        CreatePurchaseComponent,
        CreateHouseholdComponent,
        NavBarHouseholdComponent,
        EditArticleComponent
    ],

    imports:
    [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpModule
    ],

    providers:
    [
        {
            provide: Http,
            useFactory:
                (backend: XHRBackend, defaultOptions: RequestOptions, router: Router): Http =>
                {
                    return new HttpInterceptorService(backend, defaultOptions, router);
                },
            deps: [XHRBackend, RequestOptions, Router]
        }
    ],

    bootstrap: [AppComponent]
})
export class AppModule { }
