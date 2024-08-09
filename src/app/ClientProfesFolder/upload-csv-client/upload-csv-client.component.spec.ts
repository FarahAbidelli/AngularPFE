import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvClientComponent } from './upload-csv-client.component';

describe('UploadCsvClientComponent', () => {
  let component: UploadCsvClientComponent;
  let fixture: ComponentFixture<UploadCsvClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCsvClientComponent]
    });
    fixture = TestBed.createComponent(UploadCsvClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
