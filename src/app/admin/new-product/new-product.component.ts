import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductService } from '../../product.service';
import { FileUploader } from 'ng2-file-upload';
import { TdFileService, IUploadOptions } from '@covalent/core/file';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [ TdFileService ]
})
export class NewProductComponent implements OnInit {

  product: ProductModel = new ProductModel();
  productForm: FormGroup;
  errorMsg = '';
  successMsg = '';
  categoryArr;

  fileSelectMsg: string = 'No file selected yet.';
  // fileUploadMsg: string = 'No file uploaded yet.';
  disabled: boolean = false;
  fileToUpload: File;
  
  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private fileUploadService: TdFileService, private router: Router, private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'title': [this.product.title, [
        Validators.required
      ]],
      'category': [this.product.category, [
        Validators.required
      ]],      
      'description': [this.product.description,  [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(500)
      ]],
      'image': [this.product.image, [
        Validators.required
      ]],
      'price': [this.product.price, [
        Validators.required
      ]]
    })
    
    this.productService.getCategoriesArr().subscribe(res => {
      if(res.success) {
        this.categoryArr = res.ctgArr;
      }
  });  
  }

  selectEvent(file: File): void {
    this.fileToUpload = file;
    this.fileSelectMsg = this.fileToUpload.name;
  }

  cancelEvent() {
    this.fileSelectMsg = 'No file selected';
  }

  onAddProduct() {
    this.productService.addProduct(this.product, this.fileToUpload
    ).subscribe(
      res => {
        if(res.success === true) {
            this._flashMessagesService.show('New Product added successfully!', { cssClass: 'alert-success'});
            this.router.navigate(['/admin/products']);
          } else {
            this._flashMessagesService.show('Error while deleting product!', { cssClass: 'alert-danger'});
          }
          
      }
  );
  }
}
