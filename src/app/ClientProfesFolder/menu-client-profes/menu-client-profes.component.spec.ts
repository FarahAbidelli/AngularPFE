import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuClientProfesComponent } from './menu-client-profes.component';

describe('MenuClientProfesComponent', () => {
  let component: MenuClientProfesComponent;
  let fixture: ComponentFixture<MenuClientProfesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuClientProfesComponent]
    });
    fixture = TestBed.createComponent(MenuClientProfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
