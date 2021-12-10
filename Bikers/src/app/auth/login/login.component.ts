import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BikerService } from '../../services/biker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  validacion = false
  @Input() bikerLogin= {
    email: '',
    password: ''
  };

  constructor(private BikerService:BikerService, private _Router: Router) { }

  iniciarSesion(){
    this.BikerService.login(this.bikerLogin.email, this.bikerLogin.password)
    .subscribe( resp =>{
      console.log(resp);
    })
    //console.log('Desea iniciar sesion el comprador con datos:', this.bikerLogin);
  }

}
