import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BusquedaUsuarioComponent } from './componentes/busqueda-usuario/busqueda-usuario.component';
import { DialogUsuarioComponent } from './componentes/dialog-usuario/dialog-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    BusquedaUsuarioComponent,
    DialogUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
