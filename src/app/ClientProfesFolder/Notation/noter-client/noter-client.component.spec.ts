import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoterClientComponent } from './noter-client.component';

describe('NoterClientComponent', () => {
  let component: NoterClientComponent;
  let fixture: ComponentFixture<NoterClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoterClientComponent]
    });
    fixture = TestBed.createComponent(NoterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
