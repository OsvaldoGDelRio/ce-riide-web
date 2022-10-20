import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../encuesta';

import { Evaluadores } from '../evaluadores';
import { ProcesoService } from '../proceso.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {


  estadis: Encuesta[] = [];
  evaluador!:number;
  year!:number;
  years = [
    {'id': 2019, 'texto': 2019},
    {'id': 2020, 'texto': 2020},
    {'id': 2021, 'texto': 2021},
    {'id': 3000, 'texto': 'Todos los años'},
  ];
  mes!:number;
  meses = [
    {'id': 1, 'texto': 'Enero'},
    {'id': 2, 'texto': 'Febrero'},
    {'id': 3, 'texto': 'Marzo'},
    {'id': 4, 'texto': 'Abril'},
    {'id': 5, 'texto': 'Mayo'},
    {'id': 6, 'texto': 'Junio'},
    {'id': 7, 'texto': 'Julio'},
    {'id': 8, 'texto': 'Agosto'},
    {'id': 9, 'texto': 'Septiembre'},
    {'id': 10, 'texto': 'Octubre'},
    {'id': 11, 'texto': 'Noviembre'},
    {'id': 12, 'texto': 'Diciembre'},
    {'id': 13, 'texto': 'Todo el año'},
  ];
  evaluadores: Evaluadores[] = [];

  proceso1!: number;
  proceso2!: number;
  proceso3!: number;
  proceso4!: number;
  proceso5!: number;
  proceso6!: number;

  evaluacion1!: number;
  evaluacion2!: number;
  evaluacion3!: number;

  accionProceso1!:string;
  accionProceso2!:string;
  accionProceso3!:string;
  accionProceso4!:string;
  accionProceso5!:string;
  accionProceso6!:string;

  totalEncuesta!:number;

  accionesAseguir!: string;

  constructor(public procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.procesoService.getAllEvaluadores().subscribe((data: Evaluadores[])=>{
      this.evaluadores = data;
    });
  }

  onChangeEval(event:number){
    this.evaluador=event;
    this.statsGet(this.evaluador,this.year,this.mes);    
    }
    onChangeYear(event:number){
      this.year=event;

      this.statsGet(this.evaluador,this.year,this.mes);    
      }
      onChangeMes(event:number){
        this.mes=event;
  
        this.statsGet(this.evaluador,this.year,this.mes);    
        }

  statsGet(evaluador:number,ayo:number,mes:number){
    this.procesoService.getAllStats(evaluador,ayo,mes).subscribe((data: Encuesta[])=>{
      this.estadis = data;
      var proceso1Total = 0;
      var proceso2Total = 0;
      var proceso3Total = 0;
      var proceso4Total = 0;
      var proceso5Total = 0;
      var proceso6Total = 0;

      var evaluacion1Total = 0;
      var evaluacion2Total = 0;
      var evaluacion3Total = 0;

      this.estadis.forEach(function (value) {
        proceso1Total = proceso1Total +  (value.proceso1 * 25 );
        proceso2Total = proceso2Total +  (value.proceso2 * 25 );
        proceso3Total = proceso3Total +  (value.proceso3 * 25 );
        proceso4Total = proceso4Total +  (value.proceso4 * 25 );
        proceso5Total = proceso5Total +  (value.proceso5 * 25 );
        proceso6Total = proceso6Total +  (value.proceso6 * 25 );

        evaluacion1Total = evaluacion1Total +  (value.evaluacion1 * 25 );
        evaluacion2Total = evaluacion2Total +  (value.evaluacion2 * 25 );
        evaluacion3Total = evaluacion3Total +  (value.evaluacion3 * 25 );

    });

    this.proceso1 = proceso1Total / this.estadis.length;
    this.proceso2 = proceso2Total / this.estadis.length;
    this.proceso3 = proceso3Total / this.estadis.length;
    this.proceso4 = proceso4Total / this.estadis.length;
    this.proceso5 = proceso5Total / this.estadis.length;
    this.proceso6 = proceso6Total / this.estadis.length;

    this.evaluacion1 = evaluacion1Total / this.estadis.length;
    this.evaluacion2 = evaluacion2Total / this.estadis.length;
    this.evaluacion3 = evaluacion3Total / this.estadis.length;

    this.totalEncuesta = 
    (
      this.evaluacion1 +
      this.evaluacion2 + 
      this.evaluacion3
    ) / 300 * 100;

    this.accionProceso1 = this.accionesASeguir(
      this.proceso1,          
      'No se requieren acciones',
      'Requiere inspección física',
      'Atender de forma inmediata');
        this.accionProceso2 = this.accionesASeguir(
          this.proceso2,          
          'No se requieren acciones',
          'Orientar al personal que brinda información',
          'Atender de forma inmediata'); 
          this.accionProceso3 = this.accionesASeguir(
            this.proceso3,          
            'No se requieren acciones',
            'Retroalimentar al instructor',
            'Atender de forma inmediata'); 
            this.accionProceso4 = this.accionesASeguir(
              this.proceso4,          
              'No se requieren acciones',
              'Capacitar al personal en atención al cliente',
              'Atender de forma inmediata'); 
              this.accionProceso5 = this.accionesASeguir(
                this.proceso5,          
                'No se requieren acciones',
                'Revisar mecanismos de aseguramiento de calidad en entrega de certificado',
                'Atender de forma inmediata');
                this.accionProceso6 = this.accionesASeguir(
                  this.proceso6,          
                  'No se requieren acciones',
                  'Relizar análisis de los precios',
                  'Atender de forma inmediata');
                  this.accionesAseguir = this.accionesASeguirEval(
                    this.totalEncuesta,          
                    'No se requieren acciones conoce su función',
                    'Requiere orientación básica',
                    'Requiere reforzar conocimientos');
    })
  }


  accionesASeguir(
    puntuacion:number,
    textoAlta:string,
    textoMedia:string,
    textoBaja:string){
      if (puntuacion > 80){
        return textoAlta;
      }else{
        if (puntuacion < 79 && puntuacion > 59){
          return textoMedia;
        }else{
          if (puntuacion < 60 ){
            return textoBaja;
          }else{
            return 'error';
          }
        }
      }
  }

  accionesASeguirEval(
    puntuacion:number,
    textoAlta:string,
    textoMedia:string,
    textoBaja:string){
      if (puntuacion > 94){
        return textoAlta;
      }else{
        if (puntuacion < 95 && puntuacion > 79){
          return textoMedia;
        }else{
          if (puntuacion < 80 ){
            return textoBaja;
          }else{
            return 'error';
          }
        }
      }
  }
  

}
