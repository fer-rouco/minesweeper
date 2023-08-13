import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinishedListComponent } from './finished-list.component';
import { FinishedListRoutingModule } from './finished-list-routing.module';
import { FrameworkModule } from 'src/app/framework/framework.module';


@NgModule({
  declarations: [
    FinishedListComponent
  ],
  imports: [
    CommonModule,
    FinishedListRoutingModule,
    FrameworkModule
  ]
})
export class FinishedListModule { }
