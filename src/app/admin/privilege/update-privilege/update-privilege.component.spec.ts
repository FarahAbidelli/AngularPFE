import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrivilegeComponent } from './update-privilege.component';

describe('UpdatePrivilegeComponent', () => {
  let component: UpdatePrivilegeComponent;
  let fixture: ComponentFixture<UpdatePrivilegeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePrivilegeComponent]
    });
    fixture = TestBed.createComponent(UpdatePrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
