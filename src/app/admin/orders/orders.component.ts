import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';
import { environment } from '../../../environment';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['position', 'product_name', 'user_name', 'date', 'action'];
  dataSource;
  url = environment.url;

  constructor(private productService: ProductService, private router: Router, 
    private _flashMessagesService: FlashMessagesService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllOrders();
  }

  getAllOrders() {
    this.productService.getAllOrders().subscribe(res => {
      if(res.success === false) {} 
      else {
        this.dataSource = res.orders;
      }
    });
  }
  
  delOrderDialog(id): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to delete?", button2msg: "Delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delOrder(id);
      }
    });
  }

  delOrder(id) {
    this.productService.delOrder(id).subscribe(res => {
      if(res.success === false) {
        this._flashMessagesService.show('Error! Order could not be deleted', { cssClass: 'alert-danger'});
      } else {
        this._flashMessagesService.show('Order deleted successfully', { cssClass: 'alert-success'});
      }
    });
    this.getAllOrders();
  }
}
