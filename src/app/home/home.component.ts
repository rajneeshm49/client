import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { environment } from '../../environment';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url = environment.url;
  allProducts = '';
  constructor(private productService: ProductService, private router: Router, 
    private _flashMessagesService: FlashMessagesService, private dialog: MatDialog) { }

  ngOnInit() {
    if(localStorage.getItem('user_token')) {
      this.productService.getAllProducts().subscribe(res => {
        if(res.success === false) { } 
        else {
            this.allProducts = res.products;
        }
    });
    }else {
      this.router.navigate(['/login']);
      }
      
  }

  addToCartDialog(id): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Add product to cart?", button2msg: "Add"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.addToCart(id);
      }
    });
  }

  addToCart(id) {
    this.productService.addToCart(id).subscribe(res => {
      if(res.success === false) {
        this._flashMessagesService.show('Error! Product could not be added to cart', { cssClass: 'alert-danger'});
      } else {
        this._flashMessagesService.show('Product successfully added to cart!', { cssClass: 'alert-success'});
        this.router.navigate(['/']);
      }
  });
  }

}
