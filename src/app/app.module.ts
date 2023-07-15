import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { AddProductComponent } from './Components/add-product/add-product.component';
import { ShowProductComponent } from './Components/show-product/show-product.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UpdateProductComponent } from './Components/update-product/update-product.component';
import { HeaderssComponent } from './Components/headerss/headerss.component';
import { NavsideComponent } from './Components/navside/navside.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddProductComponent,
    ShowProductComponent,
    HomeComponent,
    UpdateProductComponent,
    HeaderssComponent,
    NavsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
