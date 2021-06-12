import { Usuario } from './../../../../interfaces/usuario-interface';
import { Roles } from './../../../../interfaces/roles-interface';
import { UsuariosService } from './../../../../services/usuarios/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalAlertasComponent } from 'src/app/shared/modal-alertas/modal-alertas.component';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.css']
})
export class DialogUsuarioComponent implements OnInit {

  usuarioForm: FormGroup = this.fb.group(
    {
      nombre: [ null, Validators.required ],
      rol: [ null, Validators.required ],
      activo: [ null, Validators.required ]
    }
  );
  listaRoles: Roles[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUsuarioComponent>,
    private usuarioSvc: UsuariosService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { esEditar: boolean, usuario: any } )
  {}

  async ngOnInit() {
    this.listaRoles = await this.usuarioSvc.getListaRoles().toPromise();

    if ( this.data.esEditar === true ) {
      this.usuarioForm.setValue(
        {
          nombre: this.data.usuario.nombre,
          rol: this.data.usuario.rol,
          activo: this.data.usuario.activo,
        }
      )
    }
  }

  crearUsuario() {
    if ( this.data.esEditar === false ) {
      let faltanCampos = false;

      Object.values( this.usuarioForm.controls ).forEach( control => {
        if ( control.value === null ) {
          faltanCampos = true
        }
  
        control.markAsTouched()
      } )
  
      if ( faltanCampos !== false ) {
        return;
      }
  
      const USUARIO: Usuario = {
        rol: this.usuarioForm.get( 'rol' )?.value,
        activo: this.usuarioForm.get( 'activo' )?.value,
        nombre: this.usuarioForm.get( 'nombre' )?.value,
        gestion: true
      }

      const MENSAJE = this.usuarioSvc.crearUsuario( USUARIO )
      this.dialogRef.close( true )
      this.openDialog( false, `<b>${ MENSAJE }</b>` )
    } else {
      const USUARIO: Usuario = this.data.usuario

      USUARIO.nombre = this.usuarioForm.get( 'nombre' )?.value
      USUARIO.activo = this.usuarioForm.get( 'activo' )?.value
      USUARIO.rol = this.usuarioForm.get( 'rol' )?.value

      const MENSAJE = this.usuarioSvc.editarUsuario( USUARIO )
      this.dialogRef.close( true )
      this.openDialog( false, `<b>${ MENSAJE }</b>` )
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
