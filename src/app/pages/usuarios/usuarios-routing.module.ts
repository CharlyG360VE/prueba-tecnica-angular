import { BusquedaUsuarioComponent } from './componentes/busqueda-usuario/busqueda-usuario.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
    children: [
      {
        path: 'busqueda-usuario/:busqueda',
        component: BusquedaUsuarioComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
