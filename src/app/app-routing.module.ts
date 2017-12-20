import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HouseholdComponent } from './household/household.component'
import { HouseholdArticleManagementComponent } from './household-article-management/household-article-management.component';
import { HouseholdSettingsComponent } from './household-settings/household-settings.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes =
[

];

@NgModule
({
    imports:
    [
        RouterModule.forRoot(routes)
    ],

    exports:
    [
        RouterModule
    ]
})
export class AppRoutingModule { }
