import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectFieldComponent } from './select-field.component';
import { FieldComponent } from '../field/field.component';
import { FormsModule } from '@angular/forms';
import { TestRequirementsModule } from 'src/test/test-requirements.module';

describe('SelectFieldComponent', () => {
  let component: SelectFieldComponent;
  let fixture: ComponentFixture<SelectFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
