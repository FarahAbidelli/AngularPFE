import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../admin/update-user/update-user.component';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor(private dialog: MatDialog) { }
  openConfirmDialog(): any {
    return this.dialog.open(UpdateUserComponent, {
      width: '400px'
    });
  }
}
