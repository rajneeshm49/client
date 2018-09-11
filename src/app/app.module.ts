import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FrontendComponent } from './frontend/frontend.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminNavBarComponent } from './admin/admin-nav-bar/admin-nav-bar.component';
import { AdminLogoutComponent } from './admin/admin-logout/admin-logout.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import { NewProductComponent } from './admin/new-product/new-product.component';
import { CovalentFileModule } from '@covalent/core/file';
import { FileUploadModule } from "ng2-file-upload";
import { NewCategoryComponent } from './admin/new-category/new-category.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { OrdersComponent } from './admin/orders/orders.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavBarComponent,
    LogoutComponent,
    ProductsComponent,
    CartComponent,
    CheckoutComponent,
    FrontendComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminNavBarComponent,
    AdminLogoutComponent,
    CategoryComponent,
    ProductComponent,
    NewProductComponent,
    NewCategoryComponent,
    OrdersComponent,
    MyDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CovalentFileModule,
    FileUploadModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    MyDialogComponent
  ]
})
export class AppModule { }
