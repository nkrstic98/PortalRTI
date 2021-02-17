import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLecturesComponent } from './subject-lectures.component';

describe('SubjectLecturesComponent', () => {
  let component: SubjectLecturesComponent;
  let fixture: ComponentFixture<SubjectLecturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectLecturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLecturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
