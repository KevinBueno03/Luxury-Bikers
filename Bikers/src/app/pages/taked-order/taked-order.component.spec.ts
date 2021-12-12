import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakedOrderComponent } from './taked-order.component';

describe('TakedOrderComponent', () => {
  let component: TakedOrderComponent;
  let fixture: ComponentFixture<TakedOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakedOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
