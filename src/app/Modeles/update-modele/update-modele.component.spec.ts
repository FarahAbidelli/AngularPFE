import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateModeleComponent } from './update-modele.component';

describe('UpdateModeleComponent', () => {
  let component: UpdateModeleComponent;
  let fixture: ComponentFixture<UpdateModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateModeleComponent]
    });
    fixture = TestBed.createComponent(UpdateModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
