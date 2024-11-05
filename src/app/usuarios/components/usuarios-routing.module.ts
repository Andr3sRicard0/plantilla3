import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListarEstudiantesComponent } from './estudiantes/listar-estudiantes/listar-estudiantes.component';
import { CrearEstudiantesComponent } from './estudiantes/crear-estudiantes/crear-estudiantes.component';
import { GastosComponent } from './gastos/gastos.component';

const routes: Routes = [
  {path:'', redirectTo:'home/dashboard', pathMatch:'full'},
  {path:'home', component:HomeComponent, children:[
    {path:'dashboard', component:DashboardComponent},
    {path:'gastos', component:GastosComponent},
    {path:'listarEstudiantes', component:ListarEstudiantesComponent},
    {path:'crearEstudiante', component:CrearEstudiantesComponent},
    {path:'editarEstudiante/:id', component:CrearEstudiantesComponent}
  ]}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class UsuariosRoutingModule { }
