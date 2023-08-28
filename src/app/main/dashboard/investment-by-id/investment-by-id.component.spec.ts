import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentByIdComponent } from './investment-by-id.component';

describe('InvestmentByIdComponent', () => {
  let component: InvestmentByIdComponent;
  let fixture: ComponentFixture<InvestmentByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentByIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestmentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
