import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Biker } from '../interfaces/biker.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiBaseUrl: string = environment.BASEURL;
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

  getBiker(){
    const token = window.localStorage.getItem('token')
    this.http.get<any>(`${this.apiBaseUrl}/bikers/biker/${token}`)
    .subscribe( data =>{
      console.log(data);
      this._bikerActual = data._id;
      this.datosBiker = data;
      this.getOrderActBiker();
    })
  }

  getOrderActBiker() {
    this.http.get<any>(`${this.apiBaseUrl}/orders/order/${this._bikerActual}`)
      .subscribe(data =>{
        if (!data) {
          console.log('si entro aki')
        }else{
          this.order=data;
          this._orderActual = data._id;
          //console.log('Order Actual: ', this.order)
        }
      })
  }


}
