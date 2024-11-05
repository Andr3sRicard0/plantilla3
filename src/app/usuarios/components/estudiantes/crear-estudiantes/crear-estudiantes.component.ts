import { EstudiantesModel } from 'src/app/usuarios/models/estudiantes.model';
import * as XLSX from 'xlsx';
import { EstudianteService } from './../../../services/estudiante.service';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-estudiantes',
  templateUrl: './crear-estudiantes.component.html',
  styleUrls: ['./crear-estudiantes.component.css']
})
export class CrearEstudiantesComponent {
  cargoData = false;
  dataEstudiantes: EstudiantesModel[] = [];
  
  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.obtenerData();
  }

  obtenerData() {
    this.estudianteService.getEstudiantes().subscribe(
      (data: EstudiantesModel[]) => {
        this.dataEstudiantes = data;
      },
      (error) => {
        console.error("No logramos obtener a los estudiantes", error);
      }
    );
  }

  cargarArchivos(event: any) {
    Swal.fire({
      icon: 'info',
      title: 'Cargar Datos',
      text: '¿Estás seguro de cargar los datos a la BD?',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      background: '#131854',
      color: '#ffffff',
      confirmButtonColor: '#1f75ff',
      cancelButtonColor: '#ff1f35',
      iconColor: 'rgba(255, 0, 234, 0.5)',
    }).then(response => {
      if (response.isConfirmed) {
        this.onFileChange(event); // Llama a onFileChange con el evento
      }
    });
  }

  // Método para manejar la carga del archivo
  onFileChange(event: any) {
    const file = event.target.files[0]; // Obtiene el archivo seleccionado

    if (file) {
      const reader = new FileReader(); // Crea un nuevo lector de archivos

      reader.onload = (e: any) => {
        const data = e.target.result; // Obtiene el resultado de la lectura
        const workbook = XLSX.read(data, { type: 'binary' }); // Lee el archivo como binario
        const sheetName = workbook.SheetNames[0]; // Toma la primera hoja
        const worksheet = workbook.Sheets[sheetName]; // Obtiene la hoja

        // Convierte la hoja a un objeto JSON
        const jsonData: EstudiantesModel[] = XLSX.utils.sheet_to_json(worksheet);

        if (jsonData.length > 0) {
          this.cargarDatos(jsonData);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de Formato',
            text: 'El archivo no contiene datos válidos.',
            confirmButtonText: 'Aceptar',
            background: '#131854',
            color: '#ffffff',
          });
        }
      };
      reader.readAsBinaryString(file); // Lee el archivo como una cadena binaria
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Archivo',
        text: 'Por favor, selecciona un archivo.',
        confirmButtonText: 'Aceptar',
        background: '#131854',
        color: '#ffffff',
      });
    }
  }

  // Método para cargar los datos a la base de datos
  cargarDatos(jsonData: EstudiantesModel[]) {
    let errorOccurred = false; // Variable para rastrear si ocurrió un error

    jsonData.forEach(estudiante => {
      this.estudianteService.createEstudiante(estudiante).subscribe(
        response => {
          console.log('Estudiante creado:', response);
          this.obtenerData(); // Actualiza la tabla después de cada creación
        },
        error => {
          console.error('Error al crear estudiante:', error);
          errorOccurred = true; // Si hay un error, se actualiza la variable
        }
      );
    });

    // Al finalizar todas las solicitudes, muestra un mensaje
    setTimeout(() => {
      if (errorOccurred) {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar estudiantes',
          text: 'Verique que sea un formato válido o archivo de excel.',
          confirmButtonText: 'Aceptar',
          background: '#131854',
          color: '#ffffff',
          confirmButtonColor: '#1f75ff'
        });
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Datos Cargados Exitosamente!!!',
          text: 'Los Datos se guardaron de manera correcta',
          confirmButtonText: 'Aceptar',
          background: '#131854',
          color: '#ffffff',
          confirmButtonColor: '#1f75ff',
        });
      }
    }, 1000); // Espera un segundo para permitir que se completen todas las solicitudes
  }
}