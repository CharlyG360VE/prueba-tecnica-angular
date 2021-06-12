import { ModalAlertasComponent } from './../../../../shared/modal-alertas/modal-alertas.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// SweetAlert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosForm: FormGroup = this.fb.group(
    {
      nombre: [ null, Validators.required ]
    }
  );

  constructor(
    private fb: FormBuilder,
    private routes: Router,
    private dialog: MatDialog )
  { }

  ngOnInit(): void {
  }

  limpiarBusqueda() {
    if ( this.usuariosForm.get( 'nombre' )?.value ) {
      this.openDialog( true, '<b>¿Esta seguro(a) de limpiar su busqueda?</b>' )
        .afterClosed().subscribe(
          value => {
            if ( value === true ) {
              this.usuariosForm.get( 'nombre' )?.setValue( null )

              this.openDialog( false, '<b>Busqueda reiniciada!</b>' )
            }
          }
        )
    }
  }

  busqueda() {
    if ( this.usuariosForm.get( 'nombre' )?.value ) {
      this.routes.navigateByUrl( '/', { skipLocationChange: true } ).then(
        () => this.routes.navigate(
          [
            '/gestion-usuarios/busqueda-usuario', this.usuariosForm.get( 'nombre' )?.value
          ]
        )
      );
    } else {
      this.routes.navigateByUrl( '/', { skipLocationChange: true } ).then(
        () => this.routes.navigate(
          [
            '/gestion-usuarios/busqueda-usuario', ''
          ]
        )
      );
    }
  }

  openDialog( esConfirmacion: boolean, texto: string ) {
    const dialogRef = this.dialog.open(
      ModalAlertasComponent,
      {
        width: '28rem',
        data: { esConfirmacion, texto }
      }
    )

    return dialogRef;
  }

}
