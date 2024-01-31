import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FrameworkModule } from './framework/framework.module';
import { PageNotFoundComponent } from './game/pages/page-not-found/page-not-found.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FrameworkModule, 
    ServiceWorkerModule.register(
      'ngsw-worker.js', {
        enabled: !isDevMode(),
        // Register the ServiceWorker as soon as the application is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000'
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
