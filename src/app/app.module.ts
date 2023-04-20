import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalContentWithInterceptorComponent, SheetsComponent } from './components/sheets/sheets.component';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CommonModule } from '@angular/common';
import { SheetsitemComponent } from './components/sheets/sheetsitem/sheetsitem.component';
import { UserProfileBlockComponent } from './templates/user-profile-block/user-profile-block.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    SheetsComponent,
    ModalContentWithInterceptorComponent,
    SheetsitemComponent,
    UserProfileBlockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
