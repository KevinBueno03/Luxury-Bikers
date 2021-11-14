import { Injectable } from '@angular/core';
import { Biker } from '../interfaces/biker.interface';

@Injectable({
  providedIn: 'root'
})

export class BikerService {
  private _bikerActual = '';

  public datosBiker: Biker =
    {
      _id: '',
      name: '',
      email: '',
      dni: '',
      phone: '',
      password: ''
    };

  constructor(){

  }

  get biker(): Biker {
    return this.datosBiker;
  }

  public get bikerActual() {
    return this._bikerActual;
  }

  public set bikerActual(value) {
    this._bikerActual = value;
  }

  guardarNuevoBiker(biker:Biker) {
    console.log('guardar desde el service');
  }
}
