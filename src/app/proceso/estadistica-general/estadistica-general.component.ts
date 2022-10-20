import { Component, OnInit } from '@angular/core';
import { EstadisticaGeneral } from '../estadistica-general';
import { Proceso } from '../proceso';
import { ProcesoService } from '../proceso.service';

@Component({
  selector: 'app-estadistica-general',
  templateUrl: './estadistica-general.component.html',
  styleUrls: ['./estadistica-general.component.css']
})
export class EstadisticaGeneralComponent implements OnInit {
  estadistica!: EstadisticaGeneral;
  procesos: Proceso[] = [];
  promedioEntrega!: number;
  promedioEntrega2!: number;

  constructor(private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.procesoService.getStatsGen().subscribe(( data: EstadisticaGeneral) =>{
      this.estadistica = data;
    });
    
    this.procesoService.getAll().subscribe((data: Proceso[])=>{
      this.procesos = data.sort((a,b) => a.id - b.id);
      
          var diasEntrega = 0;
          var diasEntrega2 = 0;

          this.procesos.forEach(function (value) {
            
            var date1 = new Date(value.fecha_recep); 
            var date2 = new Date(value.fecha_entre);
            var date3 = new Date(value.fecha_eval); 
            // Dias entre fecha recibido y la entrega
            var Time = date2.getTime() - date1.getTime(); 
            diasEntrega = (Time / (1000 * 3600 * 24)) + diasEntrega;
            // Dias entre la evaluacion y la entrega
            var Time2 = date2.getTime() - date3.getTime();
            diasEntrega2 = (Time2 / (1000 * 3600 * 24)) + diasEntrega2;
        });

        this.promedioEntrega = diasEntrega / this.procesos.length;
        this.promedioEntrega2 = diasEntrega2 / this.procesos.length;
    })
  }

}
