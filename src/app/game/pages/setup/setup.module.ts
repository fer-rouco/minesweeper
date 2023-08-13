import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import { SetupRoutingModule } from './setup-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';

@NgModule({
  declarations: [
    SetupComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    FrameworkModule
  ]
})
export class SetupModule { }
