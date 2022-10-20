import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProcesoService } from 'src/app/proceso/proceso.service';
import { Usuario } from 'src/app/proceso/usuario';
import { DataSharingService } from 'src/app/shared/data-sharing-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  usuario!: Usuario;

  constructor(private router: Router, private dataSharingService: DataSharingService, private procesoService: ProcesoService) {

    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.isUserLoggedIn = value;

      if(this.isUserLoggedIn)
      {
        this.procesoService.getUser().subscribe( (data: Usuario) => { 
          this.usuario = data;
        });

      }

    });

   }

  isUserLoggedIn!: boolean;

  ngOnInit(): void {
    if(localStorage.getItem('token'))
    {
      this.dataSharingService.isUserLoggedIn.next(true);
    }
  }

  logout()
  {
    localStorage.removeItem('token');
    this.dataSharingService.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

}
