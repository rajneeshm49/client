import { Component, DoCheck } from '@angular/core';
import { ProductService } from '../product.service';
import {UserService } from '../user.service';
import { environment } from '../../environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements DoCheck {

  private isLoggedIn;
  private name;
  private message;
  private url = environment.url;
  private cartCount;

  constructor(private productService: ProductService, private userService: UserService, private dialog: MatDialog,
  private router: Router) {}

  ngOnInit() {
    this.getCartCount();
  }
  
  getCartCount() {
    this.productService.getCartItemsCount().subscribe(res => {
      if(res.success) {
        this.cartCount = (res.count)?res.count:0;
      }
    });
  }

  ngDoCheck() {
    if(localStorage.getItem('user_token')) {
      this.isLoggedIn = true;
      this.name = localStorage.getItem('user');
      // this.getCartCount();
    } else {
        this.isLoggedIn = false;
    }
    if(this.productService.addedToCart  || this.userService.justLoggedIn) {
      this.getCartCount();
      this.productService.addedToCart = false;
      this.userService.justLoggedIn = false;
    }
  }

  logoutDialog(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to logout?", button2msg: "Logout"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.router.navigate(['/logout']);
      }
    });
  }

}
