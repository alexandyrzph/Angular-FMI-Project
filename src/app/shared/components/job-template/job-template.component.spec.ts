import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobTemplateComponent } from './job-template.component';

describe('JobTemplateComponent', () => {
  let component: JobTemplateComponent;
  let fixture: ComponentFixture<JobTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
