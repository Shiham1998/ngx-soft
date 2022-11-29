import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditStaffComponent } from './addedit-staff.component';

describe('AddeditStaffComponent', () => {
  let component: AddeditStaffComponent;
  let fixture: ComponentFixture<AddeditStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
