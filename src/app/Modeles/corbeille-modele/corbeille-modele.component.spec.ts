import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorbeilleModeleComponent } from './corbeille-modele.component';

describe('CorbeilleModeleComponent', () => {
  let component: CorbeilleModeleComponent;
  let fixture: ComponentFixture<CorbeilleModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorbeilleModeleComponent]
    });
    fixture = TestBed.createComponent(CorbeilleModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
