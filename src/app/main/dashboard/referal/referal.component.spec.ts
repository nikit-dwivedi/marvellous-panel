import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalComponent } from './referal.component';

describe('ReferalComponent', () => {
  let component: ReferalComponent;
  let fixture: ComponentFixture<ReferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
