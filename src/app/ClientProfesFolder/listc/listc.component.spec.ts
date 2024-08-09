import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcComponent } from './listc.component';

describe('ListcComponent', () => {
  let component: ListcComponent;
  let fixture: ComponentFixture<ListcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListcComponent]
    });
    fixture = TestBed.createComponent(ListcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
