import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BikerService } from 'src/app/services/biker.service';
import { OrderService } from 'src/app/services/order.service';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  mapa!: mapboxgl.Map;
  data= JSON.stringify('all');
  token= JSON.stringify(localStorage.getItem("token"));
  longitud = -87.207;
  latitud = 14.0383;
  jsonLngLat: any;

  biker: any;
  ordenesPagadas:any;

  idOrdenSeleccionada:any;
  orden:any;
  body:any;
  constructor(
    private modalService:NgbModal,private bikerService : BikerService, private orderService: OrderService) { }

  ngOnInit(): void {

    this.bikerService.obtenerBiker().subscribe(
      res =>{
        console.log(res);
        this.biker=res;
        console.log(this.biker);
      },error =>{
        console.log(error);
      }
    )

    this.orderService.obtenerOrdenesPagadasSinTomar().subscribe(
      res =>{
        this.ordenesPagadas=res;
      },
      error =>{
        console.log(error);
      }
    );

    (mapboxgl as any).accessToken = environment.mapBoxKey;
    this.mapa = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.longitud, this.latitud],
      zoom: 15
    });
    this.crearMarcador(this.longitud, this.latitud);
  }

  crearMarcador(longitud: number, latitud: number) {
    const marcador = new mapboxgl.Marker({
      draggable: true
    }).setLngLat([longitud, latitud])
      .addTo(this.mapa);

    this.jsonLngLat=marcador.getLngLat();
    marcador.on('drag', () => {
      this.jsonLngLat=marcador.getLngLat();
      this.longitud=marcador.getLngLat().lng;
      this.latitud=marcador.getLngLat().lat;
    })
  }

  openAsignarMotorista(modal:any,idOrder:any,orden:any){

    this.idOrdenSeleccionada=idOrder;
    this.orden= orden;
    this.crearMarcador(this.orden.location.lng,this.orden.location.lat)
    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:true
      }
    );


  }

  asignarMotoristaAOrden(){

    this.body={idBiker:this.biker._id,taked:true};
    this.orderService.updateOrder(this.idOrdenSeleccionada,this.body).subscribe(res=>{
    if(res){
      this.orderService.obtenerOrdenesPagadasSinTomar().subscribe(
        res =>{
          this.ordenesPagadas=res;
        }
        ,
        error =>{
          console.log(error);
        }
      )
      }
    });

  }

}
