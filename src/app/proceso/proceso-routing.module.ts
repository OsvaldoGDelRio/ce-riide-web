import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { CandidatoComponent } from './candidato/candidato.component';
import { LoginGuard } from '../shared/login.guard';
import { EditEncuestaComponent } from './edit-encuesta/edit-encuesta.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { EstadisticaGeneralComponent } from './estadistica-general/estadistica-general.component';
import { CertificadosComponent } from './certificados/certificados.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  { path: 'proceso', redirectTo: 'proceso/index', pathMatch: 'full'},
  { path: 'proceso/index', component: IndexComponent, canActivate:[LoginGuard] },
  { path: 'proceso/usuario', component: UsuarioComponent, canActivate:[LoginGuard] },
  { path: 'proceso/estadisticas', component: EstadisticasComponent, canActivate:[LoginGuard] },
  { path: 'proceso/generales', component: EstadisticaGeneralComponent, canActivate:[LoginGuard] },
  { path: 'proceso/certificados', component: CertificadosComponent, canActivate:[LoginGuard] },
  { path: 'proceso/create', component: CreateComponent, canActivate:[LoginGuard]},
  { path: 'proceso/edit/:idProceso', component: EditComponent, canActivate:[LoginGuard] },
  { path: 'proceso/editencuesta/:idProceso', component: EditEncuestaComponent, canActivate:[LoginGuard] },
  { path: 'proceso/candidato/:idProceso', component: CandidatoComponent, canActivate:[LoginGuard] }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesoRoutingModule { }
