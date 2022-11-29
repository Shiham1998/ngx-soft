import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricepageComponent } from './pricepage.component';

describe('PricepageComponent', () => {
  let component: PricepageComponent;
  let fixture: ComponentFixture<PricepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PricepageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PricepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
