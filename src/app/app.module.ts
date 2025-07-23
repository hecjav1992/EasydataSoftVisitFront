import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routing } from '../app/routing';
import { DashboardComponentComponent } from './dashboard-component/dashboard-component.component';
import { AppMovilComponent } from './app-movil/app-movil.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponentComponent,
    AppMovilComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
    GoogleMapsModule,
    GoogleMap,
    MapMarker
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
