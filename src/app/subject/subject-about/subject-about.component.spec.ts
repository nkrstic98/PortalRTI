import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAboutComponent } from './subject-about.component';

describe('SubjectAboutComponent', () => {
  let component: SubjectAboutComponent;
  let fixture: ComponentFixture<SubjectAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
