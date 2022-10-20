import { Component, OnInit } from '@angular/core';
import { ProcesoService } from '../proceso.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Evaluadores } from '../evaluadores';
import { Juicios } from '../juicios';
import { Dictamenes } from '../dictamenes';
import { Estados } from '../estados';
import { Estandares } from '../estandares';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  evaluadores: Evaluadores[] = [];
  juicio: Juicios[] = [];
  dictamen: Dictamenes[] = [];
  estado: Estados[] = [];
  estandar: Estandares[] = [];

  constructor(
    public procesoService: ProcesoService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.procesoService.create(this.form.value).subscribe(res => {
         this.router.navigateByUrl('proceso/index');
    })
  }

}
