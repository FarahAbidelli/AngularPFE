import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVariableComponent } from './list-variable.component';

describe('ListVariableComponent', () => {
  let component: ListVariableComponent;
  let fixture: ComponentFixture<ListVariableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVariableComponent]
    });
    fixture = TestBed.createComponent(ListVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
