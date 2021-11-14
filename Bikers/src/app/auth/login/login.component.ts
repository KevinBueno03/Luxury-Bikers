import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BikerService } from '../../services/biker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Input() bikerLogin= {
    email: '',
    password: ''
  };
  public status: boolean = false;
  public validacion: boolean = false;

  constructor(private BikerService:BikerService, private _Router: Router) { }

  iniciarSesion(){
    console.log('iniciar sesion');
  }

}
