import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  allCategories;
  displayedColumns: string[] = ['position', 'category', 'action'];
  constructor(private productService: ProductService, private _flashMessagesService: FlashMessagesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.listCategory();
  }

  listCategory() {
    this.productService.getAllCategoriesAdmin().subscribe(res => {
      if(res.success) {
        this.allCategories= res.ctgArr;
      }
    });
  }

  delCategoryDialog(id): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
        ques: "Are you sure you want to delete?", button2msg: "Delete"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.delCategory(id);
      }
    });
  }

  delCategory(id) {
    this.productService.delCategory(id).subscribe(
      res => {
        if(res.success === true) {
          this.listCategory();
          this._flashMessagesService.show('Category deleted successfully!', { cssClass: 'alert-success'});
        } else {
          this._flashMessagesService.show('Error while deleting category!', { cssClass: 'alert-danger'});
        }
          
      }
  );
  }

}
