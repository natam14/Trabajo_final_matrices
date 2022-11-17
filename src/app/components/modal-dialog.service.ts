import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ModalDialogsService {

  constructor(private dialog: MatDialog) { }

  dialogRef: any;

  openDialog(templateRef: any) {
    this.dialogRef = this.dialog.open(templateRef, {
    })
    this.dialogRef.afterClosed().subscribe(() => templateRef.focus());
  }
}