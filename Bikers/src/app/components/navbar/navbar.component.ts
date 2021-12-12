import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BikerService } from 'src/app/services/biker.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombVars = [{"var": true}, {"var": false}, {"var": false}, {"var": false}];
  paginas = [{"page": 'orders'}, {"page": 'taked-orders'}, {"page": 'ship-orders'}, {"page": 'profile-user'}];

  orders = this.nombVars[0]['var'];
  ordTomadas = this.nombVars[1]['var'];
  ordEntregadas = this.nombVars[2]['var'];
  perfil = this.nombVars[3]['var'];

  constructor(private router: Router, private modalService:NgbModal, private BikerService:BikerService) { }

  ngOnInit(): void {
    this.router.navigate([`/orders`])
  }

  cambiarActiveIcon(ind:number) {
    for (let i=0; i < this.nombVars.length; i++) {
      if(i==ind){
        this.nombVars[i]['var']=true;
      } else {
        this.nombVars[i]['var']=false;
      }
    }

    this.orders = this.nombVars[0]['var'];
    this.ordTomadas = this.nombVars[1]['var'];
    this.ordEntregadas = this.nombVars[2]['var'];
    this.perfil = this.nombVars[3]['var'];
  }

  cerrarSesion(content:any) {
    this.modalService.open(content, { centered: true })
  }

  closeAndRecharge(){
    this.modalService.dismissAll();
    this.BikerService.logout();
    window.location.reload();
  }

}
