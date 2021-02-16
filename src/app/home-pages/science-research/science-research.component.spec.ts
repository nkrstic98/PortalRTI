import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceResearchComponent } from './science-research.component';

describe('ScienceResearchComponent', () => {
  let component: ScienceResearchComponent;
  let fixture: ComponentFixture<ScienceResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScienceResearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScienceResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
