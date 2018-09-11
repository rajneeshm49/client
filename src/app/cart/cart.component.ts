import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { environment } from '../../environment';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['position', 'product_name', 'price', 'image', 'action'];
  dataSource;
  url = environment.url;
  proceedToCheckout = true;

  constructor(private productService: ProductService, private router: Router, 
    private dialog: MatDialog, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.getCartDetails();
  }

  getCartDetails() {
    this.productService.getCartDetails().subscribe(res => {
      if(res.success === false) {} 
      else {
        this.dataSource = res.cart_products;
        if(!this.dataSource.length) {
          this.proceedToCheckout = false;
        }
      }
  });
  }

  delCartProdDialog(id): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to delete?", button2msg: "Delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delCartProd(id);
      }
    });
  }

  delCartProd(id) {
    this.productService.delFromCart(id).subscribe(res => {
      if(res.success === false) {
        this._flashMessagesService.show('Error! Prouct could not be deleted from cart', { cssClass: 'alert-danger'});
      } else {
        this._flashMessagesService.show('Product deleted from cart successfully', { cssClass: 'alert-success'});
      }
    });
    this.getCartDetails();
  }

  checkout() {
    this.productService.checkout().subscribe(res => {
      if(res.success === false) { } 
      else {
        this.productService.addedToCart = true;
        this._flashMessagesService.show('Successfully checked out', { cssClass: 'alert-success'});
        this.router.navigate(['/checkout']);
      }
    });
  }
}
