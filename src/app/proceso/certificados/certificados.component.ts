import { Component, OnInit } from '@angular/core';
import { DocList } from '../doc-list';
import { ProcesoService } from '../proceso.service';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css']
})
export class CertificadosComponent implements OnInit {

  certificados: DocList[] = [];

  constructor(private procesoService: ProcesoService) { }

  ngOnInit(): void {
    this.procesoService.getListFilesCert().subscribe(( data: DocList[]) =>{
      this.certificados = data;
    });
  }

  downloadFileCertificado(nombre: string){
    this.procesoService.downloadFileCert(nombre);
  }

}
