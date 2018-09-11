import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../models/category.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss']
})
export class NewCategoryComponent implements OnInit {

  category: CategoryModel = new CategoryModel();
  categoryForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productService: ProductService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      'category_name': [this.category.category_name, [
        Validators.required
      ]]
    })
  }
  
  onAddCategory() {
    this.productService.addCategory(this.category).subscribe(
      res => {
        if(res.success === true) {
          this._flashMessagesService.show('New Category added successfully!', { cssClass: 'alert-success'});
          this.router.navigate(['/admin/categories']);
          } else {
            this._flashMessagesService.show('Error while deleting category!', { cssClass: 'alert-danger'});
          }
          
      }
  );
  }

}
