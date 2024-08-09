import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleClientProfesComponent } from './module-client-profes.component';

describe('ModuleClientProfesComponent', () => {
  let component: ModuleClientProfesComponent;
  let fixture: ComponentFixture<ModuleClientProfesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleClientProfesComponent]
    });
    fixture = TestBed.createComponent(ModuleClientProfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
