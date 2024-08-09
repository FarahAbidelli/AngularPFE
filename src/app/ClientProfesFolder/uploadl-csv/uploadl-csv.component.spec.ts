import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadlCsvComponent } from './uploadl-csv.component';

describe('UploadlCsvComponent', () => {
  let component: UploadlCsvComponent;
  let fixture: ComponentFixture<UploadlCsvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadlCsvComponent]
    });
    fixture = TestBed.createComponent(UploadlCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
