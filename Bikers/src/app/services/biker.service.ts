import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Biker, AuthResponse, LoginResponse } from '../interfaces/biker.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})

export class BikerService {
  private apiBaseUrl: string = environment.BASEURL;
  
  public datosBiker: Biker =
    {
      _id: '',
      name: '',
      email: '',
      dni: '',
      phone: '',
      password: '',
      active: false
    }

  constructor(private http: HttpClient, private router: Router){}



  login ( email: string, password: string){
    const url = `${this.apiBaseUrl}/login?type=biker`;
    const body = { email, password };

    return this.http.post<LoginResponse>( url, body, {observe:'body'} )
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

    return this.http.get<LoginResponse>( url, {headers} )
      .pipe(
        map(resp => {
          if(resp.token){
            localStorage.setItem('token', resp.token!);
          }
          return true
        }),
        catchError(err => of(false))
      )
  }

  guardarNuevoBiker(body:any) {
    //console.log('guardar desde el service');
    const url = `${this.apiBaseUrl}/register-biker`;

    return this.http.post<any>( url, {name: body.name, email:body.email, password:body.password} );
  }

  logout(){
    localStorage.clear();
  }

  obtenerBiker():Observable<any>{

    const token= window.localStorage.getItem('token');
    console.log("estoy aqui",token)
    const url = `${this.apiBaseUrl}/bikers/biker/${token}`;
    console.log(url)
    return this.http.get(url,{})
  
  }

 

}
