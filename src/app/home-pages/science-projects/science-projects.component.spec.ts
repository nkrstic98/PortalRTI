import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceProjectsComponent } from './science-projects.component';

describe('ScienceProjectsComponent', () => {
  let component: ScienceProjectsComponent;
  let fixture: ComponentFixture<ScienceProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
