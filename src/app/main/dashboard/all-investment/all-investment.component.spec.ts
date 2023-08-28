import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInvestmentComponent } from './all-investment.component';

describe('AllInvestmentComponent', () => {
  let component: AllInvestmentComponent;
  let fixture: ComponentFixture<AllInvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllInvestmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
