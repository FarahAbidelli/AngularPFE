import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrivilegeWithRoleComponent } from './list-privilege-with-role.component';

describe('ListPrivilegeWithRoleComponent', () => {
  let component: ListPrivilegeWithRoleComponent;
  let fixture: ComponentFixture<ListPrivilegeWithRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPrivilegeWithRoleComponent]
    });
    fixture = TestBed.createComponent(ListPrivilegeWithRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
