import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionModeleComponent } from './gestion-modele.component';

describe('GestionModeleComponent', () => {
  let component: GestionModeleComponent;
  let fixture: ComponentFixture<GestionModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionModeleComponent]
    });
    fixture = TestBed.createComponent(GestionModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
