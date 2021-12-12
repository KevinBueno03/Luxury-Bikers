import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Biker } from 'src/app/interfaces/biker.interface';
import { BikerService } from '../../services/biker.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submited : boolean = false;
  registerForm : FormGroup;

  constructor(private BikerService:BikerService, private _Router: Router, private fB: FormBuilder, private modalService: NgbModal) {
    this.registerForm= this.fB.group({
        name: new FormControl ('',Validators.required),
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl ('',[Validators.required, Validators.minLength(8)]),
        confPass: new FormControl('',[Validators.required, Validators.minLength(8)]),
        phone: new FormControl('',[Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
        HN_ID: new FormControl('',[Validators.required, Validators.minLength(15), Validators.maxLength(15)]),
      }
    );
  }

  get registerUsuario () {
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submited=true;
    if(!this.registerForm.valid){
      return;
    }
  }

  guardarBiker(content:any){
    const {name, email,password, confPass } = this.registerForm.value;
    let buy = {
      name: name,
      email: email,
      password: password
    }
    //console.log(buy)

    this.BikerService.guardarNuevoBiker(buy)
      .subscribe(resp=>{
        console.log(resp);
        this.modalService.open(content, { centered: true});
      })
  }

  closeAndRecharge(){
    this.modalService.dismissAll();
    this._Router.navigate(['/landing']);
  }
}

