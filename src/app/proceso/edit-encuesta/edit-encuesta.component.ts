import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Encuesta } from '../encuesta';
import { Proceso } from '../proceso';
import { ProcesoService } from '../proceso.service';

@Component({
  selector: 'app-edit-encuesta',
  templateUrl: './edit-encuesta.component.html',
  styleUrls: ['./edit-encuesta.component.css']
})
export class EditEncuestaComponent implements OnInit {
  id!: number;
  proceso!: Proceso;
  form!: FormGroup;
  encuesta!: Encuesta;
  puntos = [
    {
      'puntos': 0,
      'texto': 'No aplica'
    },
    {
      'puntos': 1,
      'texto': 'Totalmente en desacuerdo'
    }, 
    {
      'puntos': 2,
      'texto': 'Pacialmente de acuerdo'
    }, 
    {
      'puntos': 3,
      'texto': 'De acuerdo'
    }, 
    {
      'puntos': 4,
      'texto': 'Totalmente de acuerdo'
    },   
  ];

  constructor(
    public procesoService: ProcesoService,
    private route: ActivatedRoute,
    private router: Router,) { }

    ngOnInit(): void { 
   
      this.id = this.route.snapshot.params['idProceso'];
      /**
       * Datos del proceso
       */
      this.procesoService.find(this.id).subscribe((data: Proceso)=>{
        this.proceso = data;
        /**
         * Encuesta
         */
        this.procesoService.findEncuesta(this.id).subscribe(( dat: Encuesta) =>{
          this.encuesta = dat;

          this.form.patchValue({
            proceso1: this.encuesta.proceso1,
            proceso2: this.encuesta.proceso2,
            proceso3: this.encuesta.proceso3,
            proceso4: this.encuesta.proceso4,
            proceso5: this.encuesta.proceso5,
            proceso6: this.encuesta.proceso6,
            evaluacion1: this.encuesta.evaluacion1,
            evaluacion2: this.encuesta.evaluacion2,
            evaluacion3: this.encuesta.evaluacion3,
            id_proceso: this.proceso.id,
            id_folio: this.proceso.folio,
            id_evaluador: this.proceso.id_evaluadores,
          });

       });

        this.form = new FormGroup({
          id_proceso: new FormControl('', [ Validators.required ]),
          id_folio: new FormControl('', [ Validators.required ]),
          id_evaluador: new FormControl('', [ Validators.required ]),
          proceso1: new FormControl('', [ Validators.required ]),
          proceso2: new FormControl('', [ Validators.required ]),
          proceso3: new FormControl('', [ Validators.required ]),
          proceso4: new FormControl('', [ Validators.required ]),
          proceso5: new FormControl('', [ Validators.required ]),
          proceso6: new FormControl('', [ Validators.required ]),
          evaluacion1: new FormControl('', [ Validators.required ]),
          evaluacion2: new FormControl('', [ Validators.required ]),
          evaluacion3: new FormControl('', [ Validators.required ]),          
        });
  
        
  
      });
    }
  
      get f(){
        return this.form.controls;
      }
    
    submit(){
      this.procesoService.updateEncuesta(this.id, this.form.value).subscribe(res => {
           this.router.navigateByUrl('proceso/candidato/' + this.id);
      })
    }

}
