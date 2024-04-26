import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from 'src/dashboard/dashboard.component';
import { LoginComponent } from 'src/login/login.component';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/user.service';
import { SignUpFormOpenerComponent } from 'src/sign-up-form-opener/sign-up-form-opener.component';
import { SignUpFormComponent } from 'src/sign-up-form/sign-up-form.component';
import { ExampleProgressbarComponent } from '../progress-bar/progress-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CacheInterceptor } from './cache-interceptor';
import { NodeService } from './nodeservice';
import { RouterService } from 'src/services/router.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpFormComponent,
    SignUpFormOpenerComponent,
    DashboardComponent,
    ExampleProgressbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [NodeService, HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
    UserService,
    AuthenticationService,
    RouterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
