import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HouseholdComponent } from './household/household.component'
import { HouseholdArticleManagementComponent } from './household-article-management/household-article-management.component';
import { HouseholdSettingsComponent } from './household-settings/household-settings.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes =
[
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'household/:id', component: HouseholdComponent },
    { path: 'household/:id/articles', component: HouseholdArticleManagementComponent },
    { path: 'household/:id/settings', component: HouseholdSettingsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'purchase/:id', component: PurchaseComponent }
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
