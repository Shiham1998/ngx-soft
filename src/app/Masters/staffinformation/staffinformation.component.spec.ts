import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffinformationComponent } from './staffinformation.component';

describe('StaffinformationComponent', () => {
  let component: StaffinformationComponent;
  let fixture: ComponentFixture<StaffinformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffinformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffinformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
