import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env';
import { GastoModel } from '../models/gasto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiURL = environment.apiEnv;
  constructor(private http : HttpClient) { }

  createGasto(gasto : GastoModel): Observable<any>{
    return this.http.post(`${this.apiURL}/gasto`, gasto);
  }

  getGastos(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/gasto`);
  }

  getGastoById(gasto : GastoModel): Observable<GastoModel>{
    return this.http.get<GastoModel>(`${this.apiURL}/gasto/${gasto.id}`);
  }

  updateGasto(gasto : GastoModel): Observable<any>{
    return this.http.put(`${this.apiURL}/gasto/${gasto.id}`, gasto)
  }

  deleteGasto(id: number):Observable<any>{
    return this.http.delete(`${this.apiURL}/gasto/${id}`);
  }
}
