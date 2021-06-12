import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'inicio',
    loadChildren: () => import( './pages/inicio/inicio.module' )
      .then( module => module.InicioModule )
  },
  {
    path: 'gestion-usuarios',
    loadChildren: () => import( './pages/usuarios/usuarios.module' )
      .then( module => module.UsuariosModule )
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
