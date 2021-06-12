import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-alertas',
  templateUrl: './modal-alertas.component.html',
  styleUrls: ['./modal-alertas.component.css']
})
export class ModalAlertasComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalAlertasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { esConfirmacion: boolean, texto: string } )
  { }

  ngOnInit(): void {
  }

}
