import { Routes } from "@angular/router";
import { MenuComponent } from "./Pages/menu.component/menu.component";
import { RegisterPageComponent } from "./Pages/register-page.component/register-page.component";
import { LoginPageComponent } from "./Pages/login-page.component/login-page.component";
import { CartComponent } from "./Pages/cart.component/cart.component";
import { HomeComponent } from "./Pages/home.component/home.component";
import { Admin } from "./Pages/admin/admin";

export const routes: Routes = [
 { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'cart',component:CartComponent},
  {path: 'home',component:HomeComponent},
  {path:'admin',component:Admin}
];
