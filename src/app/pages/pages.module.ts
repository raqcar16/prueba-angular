import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent, DialogUser } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';

@NgModule({
  declarations: [
    PagesComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DialogUser,
    NavComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [PagesComponent],
  providers: [HttpClientModule],
})
export class PagesModule {}
