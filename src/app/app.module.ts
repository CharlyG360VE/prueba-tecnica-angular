import { MaterialPrincipalModule } from './material-principal/material-principal.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalAlertasComponent } from './shared/modal-alertas/modal-alertas.component';


@NgModule({
  declarations: [
    AppComponent,
    ModalAlertasComponent
  ],
  imports: [
    BrowserModule,
    MaterialPrincipalModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
