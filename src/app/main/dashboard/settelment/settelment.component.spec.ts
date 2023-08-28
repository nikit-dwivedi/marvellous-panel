import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettelmentComponent } from './settelment.component';

describe('SettelmentComponent', () => {
  let component: SettelmentComponent;
  let fixture: ComponentFixture<SettelmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettelmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettelmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
