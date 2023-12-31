import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameworkModule } from './framework/framework.module';
import { PageNotFoundComponent } from './game/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [RouterModule, BrowserModule, AppRoutingModule, FrameworkModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
