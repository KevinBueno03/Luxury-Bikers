import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ShipOrderComponent } from './pages/ship-order/ship-order.component';
import { TakedOrderComponent } from './pages/taked-order/taked-order.component';


const routes: Routes = [
  {
      path: 'login',
      component: LoginComponent
  },
  {
      path: 'sign-up',
      component: RegisterComponent
  },
  {
      path: 'orders',
      component: OrdersComponent
  },
  {
      path: 'profile',
      component: ProfileComponent
  },
  {
      path: 'ship-order',
      component: ShipOrderComponent
  },
  {
      path: 'taked-order',
      component: TakedOrderComponent
  },
  {
      path: '',
      component: AppComponent
  },
  {
      path: '**',
      redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const ArrayOfComponents = [LoginComponent, RegisterComponent]
