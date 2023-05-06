import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CommonModule } from '@angular/common';
import { UserProfileBlockComponent } from './templates/blocks/user-profile-block/user-profile-block.component';
import { ManagerProfileBlockComponent } from './templates/blocks/manager-profile-block/manager-profile-block.component';
import { AdmHeadBlockComponent } from './templates/blocks/adm-head-block/adm-head-block.component';
import { AdmAdminBlockComponent } from './templates/blocks/adm-admin-block/adm-admin-block.component';
import { OperatorRegulatorBlockComponent } from './templates/blocks/operator-regulator-block/operator-regulator-block.component';
import { OperatorIsirtBlockComponent } from './templates/blocks/operator-isirt-block/operator-isirt-block.component';
import { OperatorAuditBlockComponent } from './templates/blocks/operator-audit-block/operator-audit-block.component';
import { OperatorIsidBlockComponent } from './templates/blocks/operator-isid-block/operator-isid-block.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    UserProfileBlockComponent,
    AdmHeadBlockComponent,
    AdmAdminBlockComponent,
    ManagerProfileBlockComponent,
    OperatorRegulatorBlockComponent,
    OperatorIsirtBlockComponent,
    OperatorAuditBlockComponent,
    OperatorIsidBlockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
