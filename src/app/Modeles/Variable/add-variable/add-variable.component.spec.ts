import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVariableComponent } from './add-variable.component';

describe('AddVariableComponent', () => {
  let component: AddVariableComponent;
  let fixture: ComponentFixture<AddVariableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVariableComponent]
    });
    fixture = TestBed.createComponent(AddVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
