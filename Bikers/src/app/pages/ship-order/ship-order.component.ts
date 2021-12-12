import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BikerService } from 'src/app/services/biker.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-ship-order',
  templateUrl: './ship-order.component.html',
  styleUrls: ['./ship-order.component.css']
})
export class ShipOrderComponent implements OnInit {

 
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

  }

  

  openAsignarMotorista(modal:any,idOrder:any,orden:any){

    this.idOrdenSeleccionada=idOrder;
    this.orden= orden;
    
    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:true
      }
    );


  }
  asignarMotoristaAOrden(){
  
    this.body={idBiker:this.biker._id,taked:true,orderStatus:"Tomada"};
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
