import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, Biker } from '../interfaces/biker.interface';
import { Order } from '../interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private APIURL: string = environment.BASEURL;
 
 
  constructor(private http: HttpClient, private router: Router){}

  
    obtenerOrdenesPagadasSinTomar():Observable<any>{
      return this.http.get(`${this.APIURL}/orders/not-paid-not-taked`,{})
  }
  
   
  updateOrder(id:string, body:any): Observable<any>{
    const url = `${this.APIURL}/orders/order/${id}`;
    return this.http.put<any>(url, body,{ observe: "body"});
  }

  obtenerOrdenestomadasBiker(id:any):Observable<any>{
    return this.http.get(`${this.APIURL}/orders/biker/${id}`,{})
}


}
