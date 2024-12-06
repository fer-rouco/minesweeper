import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({ declarations: [],
    exports: [
        BrowserModule,
        FormsModule,
        BrowserAnimationsModule,
    ], imports: [BrowserModule,
        FormsModule,
        BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] })
export class TestRequirementsModule {}
