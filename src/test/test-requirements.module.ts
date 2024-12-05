import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FrameworkModule } from 'src/app/framework/framework.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [],
    exports: [
        BrowserModule,
        FormsModule,
        RouterTestingModule,
        FrameworkModule,
        BrowserAnimationsModule,
    ], imports: [BrowserModule,
        FormsModule,
        RouterTestingModule,
        FrameworkModule,
        BrowserAnimationsModule], providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()] })
export class TestRequirementsModule {}
