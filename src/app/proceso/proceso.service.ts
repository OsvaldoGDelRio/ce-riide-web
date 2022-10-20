import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Proceso } from './proceso';
import { DocList } from './doc-list';
import { Evaluadores } from './evaluadores';
import { Dictamenes } from './dictamenes';
import { Estados } from './estados';
import { Estandares } from './estandares';
import { Juicios } from './juicios';
import { Encuesta } from './encuesta';
import { EstadisticaGeneral } from './estadistica-general';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root'
})
export class ProcesoService {

  private apiURL = "https://apice.riide.org.mx/proceso/";
  private ApiRoot = "https://apice.riide.org.mx/";

  httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`,
     })
  }

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.ApiRoot + 'user', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAll(): Observable<Proceso[]> {
   return this.httpClient.get<Proceso[]>(this.apiURL, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 create(proceso:Proceso): Observable<Proceso> {
   return this.httpClient.post<Proceso>(this.apiURL, JSON.stringify(proceso), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 find(id:number): Observable<Proceso> {
   return this.httpClient.get<Proceso>(this.apiURL + id, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 findEncuesta(id:number): Observable<Encuesta> {
  return this.httpClient.get<Encuesta>(this.apiURL + 'encuesta/' + id, this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

 update(id:number, proceso:Proceso): Observable<Proceso> {
   return this.httpClient.put<Proceso>(this.apiURL + id, JSON.stringify(proceso), this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 updateEncuesta(id:number, proceso:Proceso): Observable<Proceso> {
  return this.httpClient.put<Proceso>(this.apiURL + 'encuesta/' + id, JSON.stringify(proceso), this.httpOptions)
  .pipe(
    catchError(this.errorHandler)
  )
}

 delete(id:number){
   return this.httpClient.delete<Proceso>(this.apiURL + id, this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
 }

 downloadFile(folio: number, nombre: string){
  this.httpClient.get(this.apiURL + 'file/' + folio +  '/' + nombre, {
    responseType: 'arraybuffer', headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }) 
  } 
   ).subscribe(response => this.downLoad(response, "application/pdf"));
 }

 downloadFileEvidencia(folio: number, nombre: string){
  this.httpClient.get(this.apiURL + 'file/' + folio +  '/evidencias/' + nombre, {
    responseType: 'arraybuffer', headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }) 
  } 
   ).subscribe(response => this.downLoad(response, "application/pdf"));
 }

 downloadImage(folio: number, nombre: string){
  this.httpClient.get(this.apiURL + 'file/' + folio +  '/imagen/' + nombre, {
    responseType: 'arraybuffer', headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }) 
  } 
   ).subscribe(response => this.downLoad(response, "image/jpeg"));
 }

 downloadZip(folio: number){
  this.httpClient.get(this.apiURL + 'zip/' + folio, {
    responseType: 'arraybuffer', headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }) 
  } 
   ).subscribe(response => this.downLoad(response, "application/zip"));
 }

 downloadFileCert(nombre: string){
  this.httpClient.get(this.apiURL + 'file/cert/' + nombre, {
    responseType: 'arraybuffer', headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }) 
  } 
   ).subscribe(response => this.downLoad(response, "application/pdf"));
 }

 downLoad(data: any, type: string) {
  let blob = new Blob([data], { type: type});
  let url = window.URL.createObjectURL(blob);
  let pwa = window.open(url);
  if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert( 'Por favor deshabilita el bloqueador de ventanas emergentes e intenta de nuevo.');
  }
}

getListFiles(folio: number): Observable<DocList[]> {
  return this.httpClient.get<DocList[]>(this.apiURL + 'files/' + folio , this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
}

getListFilesImg(folio: number): Observable<DocList[]> {
  return this.httpClient.get<DocList[]>(this.apiURL + 'files/imagenes/' + folio , this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
}

getListFilesCert(): Observable<DocList[]> {
  return this.httpClient.get<DocList[]>(this.apiURL + 'files/certificados/' , this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
}

getListFilesEvidencias(folio: number): Observable<DocList[]> {
  return this.httpClient.get<DocList[]>(this.apiURL + 'files/evidencias/' + folio , this.httpOptions)
   .pipe(
     catchError(this.errorHandler)
   )
}

 errorHandler(error:any) {
   let errorMessage = '';
   if(error.error instanceof ErrorEvent) {
     errorMessage = error.error.message;
   } else {
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   return throwError(errorMessage);
 }

 /**
  * Catalogos
  */

  getAllEvaluadores(): Observable<Evaluadores[]> {
    return this.httpClient.get<Evaluadores[]>(this.apiURL + 'catalogo/evaluadores', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllDictamenes(): Observable<Dictamenes[]> {
    return this.httpClient.get<Dictamenes[]>(this.apiURL + 'catalogo/dictamenes', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllEstados(): Observable<Estados[]> {
    return this.httpClient.get<Estados[]>(this.apiURL + 'catalogo/estados', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllEstandares(): Observable<Estandares[]> {
    return this.httpClient.get<Estandares[]>(this.apiURL + 'catalogo/estandares', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  getAllJuicios(): Observable<Juicios[]> {
    return this.httpClient.get<Juicios[]>(this.apiURL + 'catalogo/juicios', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  /**
   * stats
   */
   getAllStats(evaluador:number,ayo:number,mes:number): Observable<Encuesta[]> {
    return this.httpClient.get<Encuesta[]>(this.apiURL + 'estadisticas/encuestas/' + evaluador + '/' + ayo + '/' + mes, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  //estatisticasgenerales
  getStatsGen(): Observable<EstadisticaGeneral> {
    return this.httpClient.get<EstadisticaGeneral>(this.apiURL + 'stats/gen', this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
}