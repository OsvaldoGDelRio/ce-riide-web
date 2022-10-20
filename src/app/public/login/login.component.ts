import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/data-sharing-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private dataSharingService: DataSharingService) { }

  ngOnInit(): void {
    
    this.form = this.fb.group(
      {
        'email': '',
        'password': ''
      }
    );
  }

  submit() {

    const formData = this.form.getRawValue();
    const data = {
      username: formData.email,
      password: formData.password,
      grant_type: 'password',
      client_id: '3',
      client_secret: 'IQDxrt0RNkxnE9ZkzKttTs9HYpYrZ2vIXfuoHMUQ',
      scope: '*'
    }

    this.http.post('https://apice.riide.org.mx/oauth/token', data).subscribe(
      (result: any) => {

        localStorage.setItem('token', result.access_token);
        this.dataSharingService.isUserLoggedIn.next(true);
        this.router.navigate(['/proceso']);
      },
      error => {
             
      }
    );

  }

}
