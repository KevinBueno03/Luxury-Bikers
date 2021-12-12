import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { BikerService } from '../../services/biker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submited : boolean = false;
  loginForm : FormGroup;

  ngOnInit():void {}

  constructor(private BikerService:BikerService, private router: Router,private formBuilder:FormBuilder, private OrderService:OrderService,) {
    this.loginForm =this.formBuilder.group({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl ('',[Validators.required, Validators.minLength(8)])
    });
  }

  get loginUsuario () {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submited=true;
    if(!this.loginForm.valid){
      return;
    }
  }

  login(){
    const {email,password} = this.loginForm.value;
    this.BikerService.login(email,password).subscribe(res =>{
      if(res){
        this.OrderService.getBiker();
        //this.router.navigateByUrl('app');
        window.location.reload();
      }else {
        alert("datos invalidos");
      }
    })
  }

}
