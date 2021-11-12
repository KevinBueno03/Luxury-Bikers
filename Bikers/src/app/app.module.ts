import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth/auth.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './shared/header/header.component';
import { OrdersComponent } from './pages/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    LoginComponent,
    AuthComponent,
    RegisterComponent,
    HeaderComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
