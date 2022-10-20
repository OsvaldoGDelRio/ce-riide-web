import { Component, OnInit } from '@angular/core';

import { ProcesoService } from '../proceso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Proceso } from '../proceso';
import { Evaluadores } from '../evaluadores';
import { Juicios } from '../juicios';
import { Dictamenes } from '../dictamenes';
import { Estados } from '../estados';
import { Estandares } from '../estandares';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  proceso!: Proceso;
  form!: FormGroup;
  evaluadores: Evaluadores[] = [];
  juicio: Juicios[] = [];
  dictamen: Dictamenes[] = [];
  estado: Estados[] = [];
  estandar: Estandares[] = [];

  constructor(
    public procesoService: ProcesoService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void { 
   
    this.id = this.route.snapshot.params['idProceso'];
    /**
     * Datos del proceso
     */
    this.procesoService.find(this.id).subscribe((data: Proceso)=>{
      this.proceso = data;

      this.form = new FormGroup({
        folio: new FormControl('', [ Validators.required ]),
        nombre:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
        fecha_eval: new FormControl('', [ Validators.required ]),
        fecha_recep: new FormControl('', [ Validators.required ]),
        fecha_entre: new FormControl('', [ Validators.required ]),
        evaluador: new FormControl('', [ Validators.required ]),
        juicio: new FormControl('', [ Validators.required ]),
        dictamen: new FormControl('', [ Validators.required ]),
        estado: new FormControl('', [ Validators.required ]),
        estandar: new FormControl('', [ Validators.required ]),
      });
      /**
       * Catalogos
       */
       this.procesoService.getAllEvaluadores().subscribe((data: Evaluadores[])=>{
        this.evaluadores = data;
      });

      this.procesoService.getAllDictamenes().subscribe((data: Dictamenes[])=>{
        this.dictamen = data;
      });

      this.procesoService.getAllEstados().subscribe((data: Estados[])=>{
        this.estado = data;
      });

      this.procesoService.getAllEstandares().subscribe((data: Estandares[])=>{
        this.estandar = data;
      });

      this.procesoService.getAllJuicios().subscribe((data: Juicios[])=>{
        this.juicio = data;
      });

      this.form.patchValue({
        folio: this.proceso.folio,
        nombre: this.proceso.nombre,
        fecha_eval: this.proceso.fecha_eval,
        fecha_recep: this.proceso.fecha_recep,
        fecha_entre: this.proceso.fecha_entre,
        evaluador: this.proceso.id_evaluadores,
        juicio: this.proceso.id_juicio,
        dictamen: this.proceso.id_dictamen,
        estado: this.proceso.id_estado,
        estandar: this.proceso.id_estandares,
      });

    });
  }

    get f(){
      return this.form.controls;
    }
  

  

  submit(){
    this.procesoService.update(this.id, this.form.value).subscribe(res => {
         this.router.navigateByUrl('proceso/candidato/' + this.id);
    })
  }

}