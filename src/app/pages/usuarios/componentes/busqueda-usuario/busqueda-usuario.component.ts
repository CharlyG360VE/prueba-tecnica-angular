import { Usuario } from './../../../../interfaces/usuario-interface';
import { DialogUsuarioComponent } from './../dialog-usuario/dialog-usuario.component';
import { UsuariosService } from './../../../../services/usuarios/usuarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Roles } from 'src/app/interfaces/roles-interface';
import { ModalAlertasComponent } from 'src/app/shared/modal-alertas/modal-alertas.component';

@Component({
  selector: 'app-busqueda-usuario',
  templateUrl: './busqueda-usuario.component.html',
  styleUrls: ['./busqueda-usuario.component.css']
})
export class BusquedaUsuarioComponent implements OnInit {

  @ViewChild( MatPaginator, { static: true } ) paginator: MatPaginator | undefined;
  private busqueda = '';
  listaRoles: Roles[] = [];
  displayedColumns: string[] = ['id', 'rol', 'nombre', 'estado', 'gestion'];
  dataSource = new MatTableDataSource<Usuario>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private usuarioSvc: UsuariosService,
    private dialog: MatDialog )
  {
    if ( this.activatedRoute.snapshot.params.busqueda.length > 0 ) {
      this.busqueda = this.activatedRoute.snapshot.params.busqueda
    }
  }

  async ngOnInit() {
    this.listaRoles = await this.usuarioSvc.getListaRoles().toPromise();
    const LISTA_USUARIOS = await this.usuarioSvc.getListaUsuarios( this.busqueda ).toPromise()

    this.dataSource = new MatTableDataSource<Usuario>( LISTA_USUARIOS );
    if ( this.paginator ) {
      this.paginator._intl.itemsPerPageLabel = 'Elementos por página'
    }
  }

  crearUsuario( esEditar: boolean, usuario?: Usuario ) {
    const dialogRef = this.dialog.open(
      DialogUsuarioComponent,
      {
        width: '40rem',
        data: { esEditar, usuario }
      }
    )

    dialogRef.afterClosed()
      .subscribe(
        value => {
          if ( value === true ) {
            this.busqueda = ''
            this.ngOnInit()
          }
        }
      )
  }

  checkRoles( codigo: number ): string {
    let nombre = ''
    if ( this.listaRoles.length > 0 ) {
      const ROL = this.listaRoles.find( rol => rol.codigo === codigo )

      if ( ROL !== undefined ) {
        nombre = ROL.nombre;
      }
    }

    return nombre;
  }

  eliminarUsuario( id: number ) {
    this.openDialog( true, '<b>¿Esta seguro(a) de eliminar el usuario?</b>' )
      .afterClosed().subscribe(
        value => {
          if ( value === true ) {
            const MENSAJE = this.usuarioSvc.eliminarUsuario( id )

            this.openDialog( false, `<b>${ MENSAJE }</b>` )
            this.busqueda = ''
            this.ngOnInit()
          }
        }
      )
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
