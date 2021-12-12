import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BikerService } from 'src/app/services/biker.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-taked-order',
  templateUrl: './taked-order.component.html',
  styleUrls: ['./taked-order.component.css']
})
export class TakedOrderComponent implements OnInit {

  biker: any={};
  //ordenes tomadas
  idBiker:String ="";
  ordenesPagadas:any;

  idOrdenSeleccionada:any;
  orden:any;
  body:any;

  constructor(private modalService:NgbModal,private bikerService : BikerService, private orderService: OrderService) { }

  ngOnInit(): void {

    this.bikerService.obtenerBiker().subscribe(
      res =>{
        console.log(res);
        this.biker=res;
        this.idBiker=this.biker._id;
        console.log( "haroa aqui",this.idBiker);
        this.orderService.obtenerOrdenestomadasBiker(this.idBiker).subscribe(
          res =>{
            console.log(res);
            this.ordenesPagadas=res;
          }
          ,
          error =>{
            console.log(error);
          }
        )
      }
      ,
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

  openDetalleFactura(modal:any){
    this.modalService.dismissAll();

    /*
    this.body={isOnLocation:true};
    this.orderService.updateOrder(this.idOrdenSeleccionada,this.body).subscribe(res=>{
    if(res){
      this.orderService.obtenerOrdenestomadasBiker(this.biker._id).subscribe(
        res =>{
          this.ordenesPagadas=res;
          console.log("hace la actualizacion")
        }
        ,
        error =>{
          console.log(error);
        }
      )
      }
    });
*/
    this.modalService.open(
      modal,
      {
        size:'xl',
        centered:true
      }
    );
  }

  actualizarEstado(estado:string){
    
    this.body={nameStatus:estado};
    this.orderService.updateOrder(this.idOrdenSeleccionada,this.body).subscribe(res=>{
    if(res){
      this.orderService.obtenerOrdenestomadasBiker(this.biker._id).subscribe(
        res =>{
          this.ordenesPagadas=res;
          console.log("hace la actualizacion")
        }
        ,
        error =>{
          console.log(error);
        }
      )
      }
    });

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
