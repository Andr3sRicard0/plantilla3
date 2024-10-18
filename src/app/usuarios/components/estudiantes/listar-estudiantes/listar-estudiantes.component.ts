import { Component } from '@angular/core';
import { EstudiantesModel } from 'src/app/usuarios/models/estudiantes.model';
import { EstudianteService } from 'src/app/usuarios/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.css']
})
export class ListarEstudiantesComponent {
  estudiantesData: EstudiantesModel[] = [];

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.obtenerEstudiante();
    console.log("prueba de inicio");
  }

  obtenerEstudiante() {
    this.estudianteService.getEstudiantes().subscribe(
      (data: EstudiantesModel[]) => {
        this.estudiantesData = data;
        //console.log('Estudiantes aquí: ', this.estudiantesData);
      },
      (error) => {
        console.error('Error al obtener estudiantes', error);
      }
    );
  }

  eliminarEstudiante(id: number) {
    Swal.fire({
      icon:'error',
      title: 'Estas Seguro de Eliminar este Estudiante.',
      text: 'Se eliminara todo registro',
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      denyButtonColor:'#1275ff',
      confirmButtonColor:'#ff2212',
      reverseButtons: true
    }).then(result => {
      if (result.isConfirmed) {
        this.estudianteService.deleteEstudiante(id).subscribe(response => {
          console.log(response);
          // Llama a obtenerEstudiante para actualizar la lista de estudiantes
          this.obtenerEstudiante(); // Asegúrate de incluir los paréntesis aquí
          Swal.fire({
            icon:'info',
            title:'Estudiante Eliminado!',
            text:'El estudiantes ah sido eliminado',
            confirmButtonText: 'Aceptar',
            confirmButtonColor:'#1275ff',
          })
        }, error => {
          console.error("Error al eliminar estudiante:", error);
        });
      }
    });
  }
}
