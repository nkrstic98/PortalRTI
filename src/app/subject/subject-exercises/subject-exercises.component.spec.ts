import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectExercisesComponent } from './subject-exercises.component';

describe('SubjectExercisesComponent', () => {
  let component: SubjectExercisesComponent;
  let fixture: ComponentFixture<SubjectExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectExercisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
