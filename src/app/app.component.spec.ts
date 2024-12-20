import { TestBed } from '@angular/core/testing';
import { TestRequirementsModule } from 'src/test/test-requirements.module';
import { AppComponent } from './app.component';
import { NotificationComponent } from './framework/generic/notification/notification.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule, AppComponent, NotificationComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'minesweeper'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('minesweeper');
  });
});
