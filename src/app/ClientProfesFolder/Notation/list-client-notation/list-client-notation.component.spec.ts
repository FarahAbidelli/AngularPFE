import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientNotationComponent } from './list-client-notation.component';

describe('ListClientNotationComponent', () => {
  let component: ListClientNotationComponent;
  let fixture: ComponentFixture<ListClientNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClientNotationComponent]
    });
    fixture = TestBed.createComponent(ListClientNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
