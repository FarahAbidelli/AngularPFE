import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNotationComponent } from './update-notation.component';

describe('UpdateNotationComponent', () => {
  let component: UpdateNotationComponent;
  let fixture: ComponentFixture<UpdateNotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateNotationComponent]
    });
    fixture = TestBed.createComponent(UpdateNotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
