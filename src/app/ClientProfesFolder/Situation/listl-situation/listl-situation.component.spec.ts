import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListlSituationComponent } from './listl-situation.component';

describe('ListlSituationComponent', () => {
  let component: ListlSituationComponent;
  let fixture: ComponentFixture<ListlSituationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListlSituationComponent]
    });
    fixture = TestBed.createComponent(ListlSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
