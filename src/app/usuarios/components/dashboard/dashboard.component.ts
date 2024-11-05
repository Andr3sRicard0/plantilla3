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
  }

  obtenerEstudiante() {
    this.estudianteService.getEstudiantes().subscribe(
      (data: EstudiantesModel[]) => {
        this.estudiantesData = data;
        // Ordenar los estudiantes después de cargar los datos
        this.ordenarEstudiantesPorApellido();
      },
      (error) => {
        console.error("Error al obtener Estudiantes", error);
      }
    );
  }
  
  ordenarEstudiantesPorApellido() {
    this.estudiantesData.sort((a, b) => {
      return a.apellidos.toLowerCase().localeCompare(b.apellidos.toLowerCase());
    });
  }
}
