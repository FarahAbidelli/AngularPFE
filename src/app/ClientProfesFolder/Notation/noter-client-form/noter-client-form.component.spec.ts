import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoterClientFormComponent } from './noter-client-form.component';

describe('NoterClientFormComponent', () => {
  let component: NoterClientFormComponent;
  let fixture: ComponentFixture<NoterClientFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoterClientFormComponent]
    });
    fixture = TestBed.createComponent(NoterClientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
