import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProcesoModule } from './proceso/proceso.module';
import { PublicModule } from './public/public.module';
import { DataSharingService } from './shared/data-sharing-service.service';
import { NavComponent } from './template/nav/nav.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    RouterModule,
    ProcesoModule,
    HttpClientModule
  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent],
})
export class AppModule { }
