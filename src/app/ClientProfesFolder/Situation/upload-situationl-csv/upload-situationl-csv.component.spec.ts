import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSituationlCsvComponent } from './upload-situationl-csv.component';

describe('UploadSituationlCsvComponent', () => {
  let component: UploadSituationlCsvComponent;
  let fixture: ComponentFixture<UploadSituationlCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadSituationlCsvComponent]
    });
    fixture = TestBed.createComponent(UploadSituationlCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
