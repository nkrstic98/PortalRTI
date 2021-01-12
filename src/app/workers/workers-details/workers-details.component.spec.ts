import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersDetailsComponent } from './workers-details.component';

describe('WorkersDetailsComponent', () => {
  let component: WorkersDetailsComponent;
  let fixture: ComponentFixture<WorkersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
