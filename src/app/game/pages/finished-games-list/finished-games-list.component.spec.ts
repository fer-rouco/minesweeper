import { CommonModule, Location } from '@angular/common';
import type { ComponentFixture } from '@angular/core/testing';
import {
  TestBed,
  fakeAsync,
  flush,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, withHashLocation } from '@angular/router';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { TableComponent } from 'src/app/framework/controls/table/table.component';
import { routes } from '../../../app.routes';
import { FinishedGamesListComponent } from './finished-games-list.component';


describe('FinishedGamesListComponent', () => {
  let component: FinishedGamesListComponent;
  let fixture: ComponentFixture<FinishedGamesListComponent>;
  let location: Location;

  const createComponentInstance = () => {
    fixture = TestBed.createComponent(FinishedGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  const findCustomTableElement = (): Element | null => {
    const querySelectorId = `.custom-table`;
    const componentInstance = fixture.debugElement.query(
      By.directive(TableComponent),
    );
    return componentInstance.nativeElement.querySelector(querySelectorId);
  };

  const findPanelElement = (): Element | null => {
    const querySelectorId = `.panel-container`;
    const componentInstance = fixture.debugElement.query(
      By.directive(PanelComponent),
    );
    return componentInstance.nativeElement.querySelector(querySelectorId);
  };

  const buildItemsList = () => {
    return [
      {
        startTime:
          'Thu Aug 17 2023 20:26:50 GMT-0300 (Argentina Standard Time)',
        endTime: 'Thu Aug 17 2023 20:26:51 GMT-0300 (Argentina Standard Time)',
        difficulty: 'EASY',
        totalTimeSpent: '1.746 seconds',
        status: 1,
      },
      {
        startTime:
          'Thu Aug 17 2023 20:26:55 GMT-0300 (Argentina Standard Time)',
        endTime: 'Thu Aug 17 2023 20:26:57 GMT-0300 (Argentina Standard Time)',
        difficulty: 'HARD',
        totalTimeSpent: '2 minutes',
        status: 0,
      },
    ];
  };

  const fillLocalStorageList = () => {
    localStorage.setItem('Minesweeper.list', JSON.stringify(buildItemsList()));
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, PanelComponent, FinishedGamesListComponent, TableComponent, CustomButtonComponent],
      providers: [provideRouter(routes, withHashLocation())]
    }).compileComponents();

    createComponentInstance();
    location = TestBed.inject(Location);
  });

  beforeEach(async () => {
    fillLocalStorageList();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show an empty table when there is no records', () => {
    localStorage.clear();
    createComponentInstance();
    const noItemsFoundSpan: HTMLSpanElement =
      findCustomTableElement()?.querySelector(
        '.custom-table__no-items-found',
      ) as HTMLSpanElement;
    expect(noItemsFoundSpan?.innerText).toBe('No items found.');
  });

  it('should read the localStorage and show the records in the table', () => {
    createComponentInstance();
    expect(component.rowObjects.length).toBeGreaterThan(0);
  });

  it('should check the dates format', () => {
    createComponentInstance();

    const dateAsString: string = buildItemsList()[0].startTime;
    const dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
    const formattedDate: string = dateTimeFormat
      .format(new Date(dateAsString))
      .replaceAll('/', '-')
      .replace(',', '');

    expect(component.rowObjects[0].startTime).toBe(formattedDate);
  });

  it('should navigate to the board page when the board button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLImageElement = findPanelElement()?.querySelector(
      '#board',
    ) as HTMLImageElement;
    linkElement.click();

    tick();

    expect(location.path()).toBe('/board');

    flush();
  }));

  it('should navigate to the setup page when the setup button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLImageElement = findPanelElement()?.querySelector(
      '#setup',
    ) as HTMLImageElement;
    linkElement.click();

    tick();

    expect(location.path()).toBe('/setup');

    flush();
  }));
});
