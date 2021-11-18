import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Biker, AuthResponse } from '../interfaces/biker.interface';

@Injectable({
  providedIn: 'root'
})

export class BikerService {
  private apiBaseUrl: string = environment.baseUrl;
  private _bikerActual = '';

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
    const url = `${this.apiBaseUrl}/login?type=buyer`;
    const body = { email, password };

    return this.http.post<AuthResponse>( url, body )
      .pipe(
        tap(resp => {
          if(resp.session_code){
            localStorage.setItem('token', resp.session_code!);
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

  guardarNuevoBiker(biker:Biker) {
    //console.log('guardar desde el service');
    const url = `${this.apiBaseUrl}/register-biker`;
    const body = { biker };

    return this.http.post<AuthResponse>( url, body );
  }
}
