import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate() {
    if(localStorage.getItem('token')){
      this.router.navigate(['/proceso']);
      return false;
    } else 
    {
      return true;
    }

    
  }
  
}
