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
  public validacionCorreo: boolean = false;
  public validacionContrasena: boolean = false;
  public status:boolean = false;
  public statusForm:boolean = false;
  public confPass: string = '';

  @Input() bikerRegistro:Biker = {
    _id: '',
    name: '',
    email: '',
    dni: '',
    phone: '',
    password: '',
    active: false
  }

  constructor(private BikerService:BikerService, private _Router: Router) { }

  guardarBiker(){
    this.validaciones();
    if(this.statusForm){
      console.log('registrar motorista con datos:', this.bikerRegistro);
    }
  }

  validaciones(){
    this.validarCorreo(this.bikerRegistro.email);
    this.validarContrasena();
    this.validarCampos();
    if(this.validacionContrasena==true || this.validacionCorreo==true || this.status==true){
      this.statusForm = false;
    }else{
      this.statusForm = true;
    }
  }

  validarContrasena(){
    if(this.bikerRegistro.password != this.confPass){
      this.validacionContrasena = true;
    }
    else{
      this.validacionContrasena = false;
    }
  }

  validarCampos(){
    if(this.bikerRegistro.name =='' || this.bikerRegistro.password=='' || this.bikerRegistro.email==''
        || this.confPass == ''){
      this.status = true;
    }
    else{
      this.status = false;
    }
  }

  validarCorreo(correo: string){
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log('correo', regularExpression.test(String(correo).toLowerCase()));
    if(regularExpression.test(String(correo).toLowerCase())){
      this.validacionCorreo = false;
    }else{
      this.validacionCorreo = true;
    }
  }

}
