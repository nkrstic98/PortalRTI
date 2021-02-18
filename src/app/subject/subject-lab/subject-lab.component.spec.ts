import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLabComponent } from './subject-lab.component';

describe('SubjectLabComponent', () => {
  let component: SubjectLabComponent;
  let fixture: ComponentFixture<SubjectLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectLabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
