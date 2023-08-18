import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardHeaderComponent } from './board-header.component';
import { TestRequirementsModule } from 'src/test/test-requirements.module';

describe('BoardHeaderComponent', () => {
  let component: BoardHeaderComponent;
  let fixture: ComponentFixture<BoardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestRequirementsModule],
      declarations: [BoardHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
