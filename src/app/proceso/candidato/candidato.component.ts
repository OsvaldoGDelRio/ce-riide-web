import { Component, OnInit } from '@angular/core';

import { ProcesoService } from '../proceso.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Proceso } from '../proceso';
import { DocList } from '../doc-list';
import { Encuesta } from '../encuesta';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {

  id!: number;
  proceso!: Proceso;
  folio!: number;
  documentos: DocList[] = [];
  evidencias: DocList[] = [];
  imagenes: DocList[] = [];
  encuesta!: Encuesta;
  totalEncuesta!: number;
  accionesAseguir!: string;
  accionProceso1!:string;
  accionProceso2!:string;
  accionProceso3!:string;
  accionProceso4!:string;
  accionProceso5!:string;
  accionProceso6!:string;

  accionEvaluacion!:string;
  
  diasDeEntrega!: number;
  diasDeEntrega2!: number;

  constructor(
    public procesoService: ProcesoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['idProceso'];

    this.procesoService.find(this.id).subscribe(( data: Proceso) =>{
      this.proceso = data;
      
      this.folio = this.proceso.folio;

      var date1 = new Date(this.proceso.fecha_recep); 
      var date2 = new Date(this.proceso.fecha_entre);
      var date3 = new Date(this.proceso.fecha_eval); 
      
      var Time = date2.getTime() - date1.getTime(); 
      this.diasDeEntrega = Time / (1000 * 3600 * 24);

      var Time2 = date2.getTime() - date3.getTime();
      this.diasDeEntrega2 = Time2 / (1000 * 3600 * 24);

      this.procesoService.getListFiles(this.folio).subscribe(( datos: DocList[]) =>{
          this.documentos = datos;
       });

       this.procesoService.getListFilesImg(this.folio).subscribe(( datos: DocList[]) =>{
        this.imagenes = datos;
     });  

       this.procesoService.getListFilesEvidencias(this.folio).subscribe(( datos: DocList[]) =>{
        this.evidencias = datos;
     });

     this.procesoService.findEncuesta(this.id).subscribe(( dat: Encuesta) =>{
      this.encuesta = dat;
      
      this.totalEncuesta =
        (
          (dat.evaluacion1 * 25) +
          (dat.evaluacion2 * 25) + 
          (dat.evaluacion3 * 25)
        ) / 300 * 100;

        this.accionProceso1 = this.accionesASeguir(
          dat.proceso1 * 25,          
          'No se requieren acciones',
          'Requiere inspección física',
          'Atender de forma inmediata');
            this.accionProceso2 = this.accionesASeguir(
              dat.proceso2 * 25,          
              'No se requieren acciones',
              'Orientar al personal que brinda información',
              'Atender de forma inmediata'); 
              this.accionProceso3 = this.accionesASeguir(
                dat.proceso3 * 25,          
                'No se requieren acciones',
                'Retroalimentar al instructor',
                'Atender de forma inmediata'); 
                this.accionProceso4 = this.accionesASeguir(
                  dat.proceso4 * 25,          
                  'No se requieren acciones',
                  'Capacitar al personal en atención al cliente',
                  'Atender de forma inmediata'); 
                  this.accionProceso5 = this.accionesASeguir(
                    dat.proceso5 * 25,          
                    'No se requieren acciones',
                    'Revisar mecanismos de aseguramiento de calidad en entrega de certificado',
                    'Atender de forma inmediata');
                    this.accionProceso6 = this.accionesASeguir(
                      dat.proceso6 * 25,          
                      'No se requieren acciones',
                      'Realizar análisis de los precios',
                      'Atender de forma inmediata');
                      this.accionesAseguir = this.accionesASeguirEval(
                        this.totalEncuesta,          
                        'No se requieren acciones conoce su función',
                        'Requiere orientación básica',
                        'Requiere reforzar conocimientos');  
   });

    });
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

  deleteProceso(id: number){
    this.procesoService.delete(id).subscribe(res => {
         console.log('Proceso deleted successfully!');
         this.router.navigate(['/proceso/index']);
    })
  }

  downloadFile(folio: number, nombre: string){
    this.procesoService.downloadFile(folio,nombre);
  }

  downloadFileEvidencia(folio: number, nombre: string){
    this.procesoService.downloadFileEvidencia(folio,nombre);
  }

  downloadImage(folio: number, nombre: string){
    this.procesoService.downloadImage(folio,nombre);
  }

  downloadAllFile(folio: number){
    this.procesoService.downloadZip(folio);
  }
}
