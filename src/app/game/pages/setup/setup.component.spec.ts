import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelComponent } from 'src/app/framework/containers/panel/panel.component';
import { TestRequirementsModule } from 'src/test/test-requirements.module';
import { SetupComponent } from './setup.component';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule],
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
});
