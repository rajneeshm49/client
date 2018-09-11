import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { environment } from '../../../environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  errorMsg;
  successMsg = '';
  allProducts = '';
  url = environment.url;
  displayedColumns: string[] = ['position', 'product_name', 'price', 'category', 'image', 'action'];

  constructor(private productService: ProductService, private _flashMessagesService: FlashMessagesService,
     private dialog: MatDialog) { }

  ngOnInit() {
    this.listProduct(); 
  }

  listProduct() {
    this.productService.getAllProductsAdmin().subscribe(res => {
      if(res.success) {
        this.allProducts = res.products;
      }
    });
  }

  delProductDialog(id): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to delete?", button2msg: "Delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delProduct(id);
      }
    });
  }

  delProduct(id) {
    this.productService.delProduct(id).subscribe(
      res => {
        if(res.success === true) {
          this._flashMessagesService.show('Product deleted successfully!', { cssClass: 'alert-success'});
          this.listProduct();
        } else {
          this._flashMessagesService.show('Error while deleting product!', { cssClass: 'alert-danger'});
        }
          
      }
  );
  }

}
