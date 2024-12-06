import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { CustomButtonComponent } from 'src/app/framework/controls/button/button.component';
import { TestRequirementsModule } from 'src/test/test-requirements.module';
import { BoardHeaderComponent } from './board-header.component';

describe('BoardHeaderComponent', () => {
  let component: BoardHeaderComponent;
  let fixture: ComponentFixture<BoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule, BoardHeaderComponent, CustomButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
