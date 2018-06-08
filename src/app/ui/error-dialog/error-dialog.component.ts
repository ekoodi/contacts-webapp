import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'cw-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<ErrorDialogComponent>) {
    this.dialog.disableClose = true;
    this.message = data.message;
  }

  ngOnInit() {
  }

  close() {
    this.dialog.close();
  }

}
