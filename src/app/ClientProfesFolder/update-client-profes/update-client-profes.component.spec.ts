import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClientProfesComponent } from './update-client-profes.component';

describe('UpdateClientProfesComponent', () => {
  let component: UpdateClientProfesComponent;
  let fixture: ComponentFixture<UpdateClientProfesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateClientProfesComponent]
    });
    fixture = TestBed.createComponent(UpdateClientProfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
