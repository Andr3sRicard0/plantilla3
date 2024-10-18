import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'src/app/menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { ListarEstudiantesComponent } from './estudiantes/listar-estudiantes/listar-estudiantes.component';
import { CrearEstudiantesComponent } from './estudiantes/crear-estudiantes/crear-estudiantes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    ListarEstudiantesComponent,
    CrearEstudiantesComponent
  ],
  exports:[
    DashboardComponent,
    HomeComponent,
    ListarEstudiantesComponent,
    CrearEstudiantesComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuModule,
    HttpClientModule
  ]
})
export class UsuariosModule { }
