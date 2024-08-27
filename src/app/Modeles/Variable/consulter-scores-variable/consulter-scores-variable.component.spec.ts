import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterScoresVariableComponent } from './consulter-scores-variable.component';

describe('ConsulterScoresVariableComponent', () => {
  let component: ConsulterScoresVariableComponent;
  let fixture: ComponentFixture<ConsulterScoresVariableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulterScoresVariableComponent]
    });
    fixture = TestBed.createComponent(ConsulterScoresVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
