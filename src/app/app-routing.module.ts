import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { NologinGuard } from './shared/nologin.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {
    path: '', component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent, canActivate: [NologinGuard] }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
