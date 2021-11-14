import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  {
      path: '**',
      redirectTo: ''
  },
  {
      path: 'login',
      component: LoginComponent,
      /* children: [
        {
            path: 'recuperacion',
            component: ,
            outlet: 'modal'
        }
    ] */
  },
  {
      path: 'sign-up',
      component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [LoginComponent, RegisterComponent]
