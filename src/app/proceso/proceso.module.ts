import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcesoRoutingModule } from './proceso-routing.module';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatoComponent } from './candidato/candidato.component';
import { EditEncuestaComponent } from './edit-encuesta/edit-encuesta.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadisticaGeneralComponent } from './estadistica-general/estadistica-general.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { UsuarioComponent } from './usuario/usuario.component';


@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    CandidatoComponent,
    EditEncuestaComponent,
    EstadisticasComponent,
    EstadisticaGeneralComponent,
    CertificadosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    ProcesoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ProcesoModule { }
