import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNotationConsulterComponent } from './list-notation-consulter.component';

describe('ListNotationConsulterComponent', () => {
  let component: ListNotationConsulterComponent;
  let fixture: ComponentFixture<ListNotationConsulterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListNotationConsulterComponent]
    });
    fixture = TestBed.createComponent(ListNotationConsulterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
