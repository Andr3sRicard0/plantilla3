import { Component } from '@angular/core';
import { EstudiantesModel } from '../../models/estudiantes.model';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  estudiantesData: EstudiantesModel[] = [];

  constructor(private estudianteService: EstudianteService){}

  ngOnInit():void{
    this.obtenerEstudiante();
    this.ordenarEstudiantesPorApellido();
  }

  obtenerEstudiante(){
    this.estudianteService.getEstudiantes().subscribe(
      (data: EstudiantesModel[]) => {
        this.estudiantesData = data;
      },
      (error) => {
        console.error("Error al obtener Estudiantes", error);
      }
    )
  }
  ordenarEstudiantesPorApellido() {
    this.estudiantesData.sort((a, b) => {
      const apellidoA = a.apellidos.toLowerCase();
      const apellidoB = b.apellidos.toLowerCase();
      if (apellidoA < apellidoB) {
        return -1;
      } else if (apellidoA > apellidoB) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
