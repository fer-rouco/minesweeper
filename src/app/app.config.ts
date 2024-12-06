import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation()),  // Enable hash location strategy
    provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
