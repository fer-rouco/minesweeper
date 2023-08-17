import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldComponent } from './input-field.component';
import { FieldComponent } from '../field/field.component';
import { FormsModule } from '@angular/forms';
import { TestRequirementsModule } from 'src/test/test-requirements.module';

describe('InputFieldComponent', () => {
  let component: InputFieldComponent;
  let fixture: ComponentFixture<InputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
