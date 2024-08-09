import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModeleComponent } from './menu-modele.component';

describe('MenuModeleComponent', () => {
  let component: MenuModeleComponent;
  let fixture: ComponentFixture<MenuModeleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuModeleComponent]
    });
    fixture = TestBed.createComponent(MenuModeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
