import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { HouseholdComponent } from './household/household.component';
import { HouseholdSettingsComponent } from './household-settings/household-settings.component';
import { HouseholdArticleManagementComponent } from './household-article-management/household-article-management.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    HouseholdComponent,
    HouseholdSettingsComponent,
    HouseholdArticleManagementComponent,
    PurchaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
