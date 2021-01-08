import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerManagementComponent } from './worker-management.component';

describe('WorkerManagementComponent', () => {
  let component: WorkerManagementComponent;
  let fixture: ComponentFixture<WorkerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
