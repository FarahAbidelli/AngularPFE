import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailslClientComponent } from './detailsl-client.component';

describe('DetailslClientComponent', () => {
  let component: DetailslClientComponent;
  let fixture: ComponentFixture<DetailslClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailslClientComponent]
    });
    fixture = TestBed.createComponent(DetailslClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
