import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { SetupComponent } from './setup.component';
import { BoardModule } from '../board/board.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TestRequirementsModule } from 'src/test/test-requirements.module';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule, BoardModule, AppRoutingModule],
      declarations: [ PanelComponent, SetupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    
  it('should navigate to the board page when the board button is clicked', fakeAsync(() => {
    fixture.detectChanges();

    const linkElement: HTMLButtonElement = fixture.nativeElement.querySelector('.custom-button') as HTMLButtonElement;
    linkElement.click();

    tick();

    expect(location.pathname).toBe('/board');

    flush();
  }));
});
