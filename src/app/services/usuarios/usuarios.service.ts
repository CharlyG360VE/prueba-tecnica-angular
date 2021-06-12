import { Usuario } from './../../interfaces/usuario-interface';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Roles } from 'src/app/interfaces/roles-interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private listaUsuarios: Usuario[] = [];
  private listaRoles: Roles[] = [
    { nombre: 'ADMINISTRADOR', codigo: 1 },
    { nombre: 'AUDITOR', codigo: 2 },
    { nombre: 'AUXILIAR', codigo: 3 }
  ];

  constructor() {}

  getListaRoles() {
    const LISTA_ROLES$: Observable<Roles[]> = of<Roles[]>( this.listaRoles )

    return LISTA_ROLES$
      .pipe( delay( 500 ) );
  }

  getListaUsuarios( busqueda: string ): Observable<Usuario[]> {
    if ( busqueda.length > 0 ) {
      const LISTA_USUARIOS$: Observable<Usuario[]> = of<Usuario[]>( this.listaUsuarios )

      return LISTA_USUARIOS$
        .pipe(
          delay( 500 ),
          map( usuarios => {
            let usuariosArray: Usuario[] = [];
            if ( usuarios.length === 0 ) {
              usuariosArray.push(
                {
                  id: 0,
                  rol: 0,
                  activo: false,
                  nombre: '---',
                  gestion: false
                }
              )
            } else {
              const RESULTADO: Usuario[] = []

              usuarios.forEach( user => {
                if ( user.nombre.toLowerCase() == busqueda.toLowerCase() ) {
                  RESULTADO.push( user )
                }
              } )

              usuariosArray = RESULTADO;
            }

            return usuariosArray;
          } )
        );
    } else {
      const LISTA_USUARIOS$: Observable<Usuario[]> = of<Usuario[]>( this.listaUsuarios )

      return LISTA_USUARIOS$
        .pipe(
          delay( 500 ),
          map( usuarios => {
            let usuariosArray: Usuario[] = [];
            if ( usuarios.length === 0 ) {
              usuariosArray.push(
                {
                  id: 0,
                  rol: 0,
                  activo: false,
                  nombre: '---',
                  gestion: false
                }
              )
            } else {
              usuariosArray = usuarios;
            }

            return usuariosArray;
          } )
        );
    }
  }

  crearUsuario( usuario: Usuario ): string {
    let id = Math.round( Math.random() * 1000000 );
    let mensaje = 'Usuario creado exitosamente!';

    if ( this.listaUsuarios.length > 0 ) {
      const EXISTE_ID = this.listaUsuarios.find( usuario => usuario.id === id )
      const EXISTE_NOMBRE = this.listaUsuarios.find( user => user.nombre.toLowerCase() === usuario.nombre.toLowerCase() )

      if ( EXISTE_ID !== undefined ) {
        id = Math.round( Math.random() * 1000000 )
      }

      if ( EXISTE_NOMBRE !== undefined ) {
        mensaje = `Ya existe un usuario con el nombre: ${ usuario.nombre }`
      } else {
        this.listaUsuarios.push( { id, ...usuario } )
      }
    } else {
      this.listaUsuarios.push( { id, ...usuario } )
    }

    return mensaje;
  }

  editarUsuario( usuario: Usuario ): string {
    let mensaje = 'Usuario Actualizado exitosamente!';
    const EXISTE_ID_INDEX = this.listaUsuarios.findIndex( usuario => usuario.id === usuario.id )

    if ( EXISTE_ID_INDEX !== -1 ) {
      this.listaUsuarios[ EXISTE_ID_INDEX ] = usuario;
    }

    return mensaje;
  }

  eliminarUsuario( id: number ): string {
    const USUARIO_INDEX = this.listaUsuarios.findIndex( usuario => usuario.id === id )
    let mensaje = 'Usuario eliminado correctamente';

    if ( USUARIO_INDEX !== -1 ) {
      this.listaUsuarios.splice( USUARIO_INDEX, 1 )
    } else {
      mensaje = 'No se ha encontrado un usuario'
    }

    return mensaje;
  }

}
