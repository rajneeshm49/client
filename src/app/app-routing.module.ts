import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { CartComponent } from './cart/cart.component';
import { FrontendComponent } from './frontend/frontend.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {AdminLogoutComponent } from './admin/admin-logout/admin-logout.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { NewCategoryComponent } from './admin/new-category/new-category.component';
import { OrdersComponent } from './admin/orders/orders.component';

const routes: Routes = [
  {path: '', component: FrontendComponent,
    children: [                          //<---- child components declared here
      {path:'', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'logout', component: LogoutComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'cart', component: CartComponent},
      {path: 'checkout', component: CheckoutComponent},
    ]
  },
  {path: 'admin', component: AdminComponent,
    children: [
      {path:'', component: AdminHomeComponent},
      {path:'login', component: AdminLoginComponent},
      {path:'logout', component: AdminLogoutComponent},
      {path:'categories', component: CategoryComponent},
      {path:'products', component: ProductComponent},
      {path:'new-product', component: NewProductComponent},
      {path:'new-category', component: NewCategoryComponent},
      {path:'orders', component: OrdersComponent},
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
