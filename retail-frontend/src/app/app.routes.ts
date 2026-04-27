import { Routes } from "@angular/router";
import { MenuComponent } from "./Pages/menu.component/menu.component";
import { RegisterPageComponent } from "./Pages/register-page.component/register-page.component";
import { LoginPageComponent } from "./Pages/login-page.component/login-page.component";

export const routes: Routes = [
//    { path: '', component: ProductList },
//   { path: 'add-product', component: AddProduct },
  {path: 'menu', component:MenuComponent,pathMatch:"full"},
  {path: 'registerpage',component:RegisterPageComponent},
  {path:'login' ,component:LoginPageComponent }
];
