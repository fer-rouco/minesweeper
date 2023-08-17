import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedGamesListComponent } from './finished-games-list.component';
import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { TableComponent } from 'src/app/framework/controls/table/table.component';
import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';

describe('FinishedGamesListComponent', () => {
  let component: FinishedGamesListComponent;
  let fixture: ComponentFixture<FinishedGamesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelComponent, FinishedGamesListComponent, TableComponent, CustomButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedGamesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
