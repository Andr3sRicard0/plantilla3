import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosRoutingModule } from './usuarios/components/usuarios-routing.module';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuariosRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
