import { Routes } from "@angular/router";
import { MenuComponent } from "./Pages/menu.component/menu.component";
import { RegisterPageComponent } from "./Pages/register-page.component/register-page.component";
import { LoginPageComponent } from "./Pages/login-page.component/login-page.component";
import { CartComponent } from "./Pages/cart.component/cart.component";

export const routes: Routes = [
 { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'cart',component:CartComponent}
];
