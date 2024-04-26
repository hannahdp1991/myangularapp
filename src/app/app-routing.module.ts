import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { LoginComponent } from 'src/login/login.component';
import { SignUpFormOpenerComponent } from 'src/sign-up-form-opener/sign-up-form-opener.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent, children: [{
      path: 'signup', component: SignUpFormOpenerComponent, outlet: 'signUpOutlet'
    }]
  },
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
