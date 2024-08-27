import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutVariableComponent } from './ajout-variable.component';

describe('AjoutVariableComponent', () => {
  let component: AjoutVariableComponent;
  let fixture: ComponentFixture<AjoutVariableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutVariableComponent]
    });
    fixture = TestBed.createComponent(AjoutVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
