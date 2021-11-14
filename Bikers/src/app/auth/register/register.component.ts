import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Biker } from 'src/app/interfaces/biker.interface';
import { BikerService } from '../../services/biker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  confPass = '';

  @Input() bikerRegistro:Biker = {
    _id: '',
    name: '',
    email: '',
    dni: '',
    phone: '',
    password: ''
  }
  public status: boolean = false;
  public validacion: boolean = false;

  constructor(private BikerService:BikerService, private _Router: Router) { }

  guardarBiker(){
    console.log('registrar motorista con datos:', this.bikerRegistro);
  }

}
