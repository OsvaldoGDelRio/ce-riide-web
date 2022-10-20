import { Component, OnInit } from '@angular/core';

import { ProcesoService } from '../proceso.service';
import { Proceso } from '../proceso';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})


export class IndexComponent implements OnInit {

  procesos: Proceso[] = [];


  constructor(public procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.procesoService.getAll().subscribe((data: Proceso[])=>{
      this.procesos = data.sort((a,b) => a.id - b.id);
    })
  }

  

}
