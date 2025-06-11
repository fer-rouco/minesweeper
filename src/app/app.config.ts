import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';


import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withHashLocation(), withViewTransitions()),  // Enable hash location strategy
    provideHttpClient(),
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ]
};
