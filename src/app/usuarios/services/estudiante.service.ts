import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';
import { EstudiantesModel } from '../models/estudiantes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  //Llamamos a la cadena de codigo en la cual almacenamos el servidor
  private apiUrl = environment.apiEnv;

  constructor(
    private http : HttpClient
  ) { }
  //crear estudiante
  createEstudiante(estudiante: EstudiantesModel): Observable<any>{
    return this.http.post(`${this.apiUrl}/estudiante`, estudiante);
  }
  //llamar a los estudiantes
  getEstudiantes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiUrl}/estudiante`);
  }
  //llamar por id
  getEstudianteById(id: number): Observable<EstudiantesModel>{
    return this.http.get<EstudiantesModel>(`${this.apiUrl}/estudiante/${id}`, );
  }
  //actualizar estudiante
  updateEstudiante(estudiante : EstudiantesModel): Observable<any>{
    return this.http.put(`${this.apiUrl}/estudiante`, estudiante);
  }
  //eliminar estudiante
  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/estudiante/${id}`);
}
}
