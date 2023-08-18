import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericFieldComponent } from './numeric-field.component';
import { TestRequirementsModule } from 'src/test/test-requirements.module';

describe('NumericFieldComponent', () => {
  let component: NumericFieldComponent;
  let fixture: ComponentFixture<NumericFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NumericFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
