import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Biker, AuthResponse, LoginResponse } from '../interfaces/biker.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})

export class BikerService {
  private apiBaseUrl: string = environment.baseUrl;
  private _bikerActual = '';
  private _orderActual = '';

  public datosBiker: Biker =
    {
      _id: '',
      name: '',
      email: '',
      dni: '',
      phone: '',
      password: '',
      active: false
    };

    public order: Order={
      _id: '',
      idBuyer: '',
      idBiker: '',
      products: [],
      paid: false,
      subtotal: 0,
      isv: 0,
      commission: 0,
      total: 0,
      address: '',
      phone: '',
      amountProducts: 0,
      taked: false,
      nameStatus: '',
      buyerName: '',
      location: {}
    }


  constructor(private http: HttpClient, private router: Router){}

  get biker(): Biker {
    return this.datosBiker;
  }

  public get bikerActual() {
    return this._bikerActual;
  }

  public set bikerActual(value) {
    this._bikerActual = value;
  }

  login ( email: string, password: string){
    const url = `${this.apiBaseUrl}/login?type=biker`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body )
      .pipe(
        tap(resp => {
          if(resp.token){
            localStorage.setItem('token', resp.token!);
          }
        }),
        map(resp => true),
        catchError(err => of(false))
      )
  }

  validarToken(){
    const url = `${this.apiBaseUrl}/auth`;
    const headers = new HttpHeaders()
    .set('x-access-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>( url, {headers} )
      .pipe(
        map(resp => {
          if(resp.session_code){
            localStorage.setItem('token', resp.session_code!);
          }
          return true
        }),
        catchError(err => of(false))
      )
  }

  guardarNuevoBiker(body:any) {
    //console.log('guardar desde el service');
    const url = `${this.apiBaseUrl}/register-biker`;

    return this.http.post<AuthResponse>( url, {name: body.name, email:body.email, password:body.password} );
  }

  logout(){
    localStorage.clear();
  }
}
