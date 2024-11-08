import { EstudiantesModel } from './../../models/estudiantes.model';
import { Component } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { GastosService } from '../../services/gastos.service';
import { GastoModel } from '../../models/gasto.model';

@Component({
  selector: 'app-gastos',
  templateUrl: './gastos.component.html',
  styleUrls: ['./gastos.component.css']
})
export class GastosComponent {

  dataGastos: GastoModel[]=[];
  dataEstudiantes: EstudiantesModel[] = [];
  abonoEstudiantes: number = 0;
  numberEstudiantes: number = 0;
  totalPagos: number = 0;
  gastosTotal:number = 0;

  constructor(
    private estudiantesService: EstudianteService,
    private gastosService : GastosService  
  ) { }

  ngOnInit(): void {
    this.obtenerGastos();
    this.obtenerGastosEventos();
  }

  obtenerGastos() {
    this.estudiantesService.getEstudiantes().subscribe(
      (data: EstudiantesModel[]) => {
        this.dataEstudiantes = data;
        this.sumarTotal();
        this.calcularTotales();
      },
      (error) => {
        console.error('No se encontró data de los gastos', error);
      }
    );
  }
  sumarTotal() {
    let total: number = 0;
    this.dataEstudiantes.forEach(estudiante => {
      total += estudiante.totalPago;
    });
    this.totalPagos = total;
  }
  calcularTotales() {
    this.numberEstudiantes = this.dataEstudiantes.length;
    this.abonoEstudiantes = this.dataEstudiantes.filter(estudiante => estudiante.totalPago > 0).length;
    this.gastosTotal = this.totalPagos;
  }
  obtenerGastosEventos(){
    this.gastosService.getGastos().subscribe(
      (data: GastoModel[]) => {
        this.dataGastos = data;
      }
    )
  }
}
