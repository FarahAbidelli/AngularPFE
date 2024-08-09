import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailslSituationComponent } from './detailsl-situation.component';

describe('DetailslSituationComponent', () => {
  let component: DetailslSituationComponent;
  let fixture: ComponentFixture<DetailslSituationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailslSituationComponent]
    });
    fixture = TestBed.createComponent(DetailslSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
