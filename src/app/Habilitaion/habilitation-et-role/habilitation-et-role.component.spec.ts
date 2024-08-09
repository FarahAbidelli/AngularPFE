import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitationEtRoleComponent } from './habilitation-et-role.component';

describe('HabilitationEtRoleComponent', () => {
  let component: HabilitationEtRoleComponent;
  let fixture: ComponentFixture<HabilitationEtRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HabilitationEtRoleComponent]
    });
    fixture = TestBed.createComponent(HabilitationEtRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
