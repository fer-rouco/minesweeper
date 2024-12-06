import { Location } from '@angular/common';
import type { ComponentFixture } from '@angular/core/testing';
import {
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';

import { provideRouter, withHashLocation } from '@angular/router';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { TestRequirementsModule } from 'src/test/test-requirements.module';
import { routes } from '../../../app.routes';
import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule, PanelComponent, SetupComponent],
      providers: [provideRouter(routes, withHashLocation())]
    }).compileComponents();

    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    location = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the board page when the board button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.custom-button',
    ) as HTMLButtonElement;
    linkElement.click();

    tick();

    expect(location.path()).toBe('/board');

    flush();
  }));
});
