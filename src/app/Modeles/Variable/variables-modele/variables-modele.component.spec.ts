import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesModeleComponent } from './variables-modele.component';

describe('VariablesModeleComponent', () => {
  let component: VariablesModeleComponent;
  let fixture: ComponentFixture<VariablesModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariablesModeleComponent]
    });
    fixture = TestBed.createComponent(VariablesModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
