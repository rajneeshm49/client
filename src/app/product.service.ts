import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  addedToCart = true;
  url = environment.url;
  productApiUrl = `${this.url}/shops`;
  adminProductApiUrl = `${this.url}/admin/products`;
  adminCategoryApiUrl = `${this.url}/admin/categories`;
  adminOrderApiUrl = `${this.url}/admin/orders`;
  constructor(private http: HttpClient) {}
  
  getAllProducts(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.get(`${this.productApiUrl}/dashboard.json`, httpOptions).pipe(
        tap(emission => {
            console.log('All Products fetched');
        }),
        catchError(val => of('Error in getting products'))
    );  
  }

  getAllOrders(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.get(`${this.adminOrderApiUrl}/index.json`, httpOptions).pipe(
        tap(emission => {
        }),
        catchError(val => of('Error in fetching orders'))
    );  
  }

  getAllProductsAdmin(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.get(`${this.adminProductApiUrl}/index.json`, httpOptions).pipe(
        tap(emission => {
            console.log('All Products fetched for admin');
        }),
        catchError(val => of('Error in getting products'))
    );  
  }

  getAllCategoriesAdmin(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.get(`${this.adminCategoryApiUrl}/index.json`, httpOptions).pipe(
        tap(emission => {
            console.log('All Categories fetched for admin');
        }),
        catchError(val => of('Error in getting categories'))
    );  
  }

  addToCart(product_id): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        }),
        params: {
            id: product_id
        }
    }
    return this.http.get(`${this.productApiUrl}/addtocart.json`, httpOptions).pipe(
        tap(emission => {
            console.log('successfully added to cart');
            this.addedToCart = true;
        }),
        catchError(val => of('Error while adding to cart'))
    );  
  }

  delFromCart(product_id): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.post(`${this.productApiUrl}/delfromcart.json`, {id: product_id}, httpOptions).pipe(
        tap(emission => {
            console.log('product successfully deleted from cart');
        }),
        catchError(val => of('Error while deleting product from cart'))
    );  
  }

  checkout(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.post(`${this.productApiUrl}/checkout.json`, {}, httpOptions).pipe(
        tap(emission => {
            console.log('successful checkout');
        }),
        catchError(val => of('Error while checking out'))
    );  
  }

  getCartDetails(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.get(`${this.productApiUrl}/cartlist.json`, httpOptions).pipe(
        tap(emission => {
            console.log('successfully added to cart');
            this.addedToCart = true;
        }),
        catchError(val => of('Error while adding to cart'))
    );  
  }

  getCartItemsCount(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.get(`${this.productApiUrl}/cartitemcount.json`, httpOptions).pipe(
        tap(emission => {
            console.log('got total items in cart');
        }),
        catchError(val => of('Error while adding to cart'))
    );  
  }

  getCategoriesArr(): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.get(`${this.adminCategoryApiUrl}/getCategoriesArr.json`, httpOptions).pipe(
        tap(emission => {           
        }),
        catchError(val => of('Error'))
    );  
  }

  addCategory(category): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.post(`${this.adminCategoryApiUrl}/add.json`, category, httpOptions).pipe(
        tap(emission => {
            console.log('Category successfully added');
        }),
        catchError(val => of('Error while adding category'))
    );   
  }

  delCategory(id): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.post(`${this.adminCategoryApiUrl}/delete.json`, {id:id}, httpOptions).pipe(
        tap(emission => {
            console.log('Category deleted successfully');
        }),
        catchError(val => of('Error while deleting category'))
    );   
  }

  delProduct(id): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.post(`${this.adminProductApiUrl}/delete.json`, {id:id}, httpOptions).pipe(
        tap(emission => {
            console.log('Product deleted successfully');
        }),
        catchError(val => of('Error while deleting product'))
    );   
  }

  delOrder(id): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }
    return this.http.post(`${this.adminOrderApiUrl}/delete.json`, {id:id}, httpOptions).pipe(
        tap(emission => {
        }),
        catchError(val => of('Error while deleting order'))
    );   
  }

  upload(file): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'authorization': 'bearer '+ localStorage.getItem('user_token')
        })
    }
    return this.http.post(`${this.productApiUrl}/cartitemcount.json`, httpOptions).pipe(
        tap(emission => {
            console.log('got total items in cart');
        }),
        catchError(val => of('Error while adding to cart'))
    );  
  }

  addProduct(product, file): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
            'authorization': 'bearer '+ localStorage.getItem('admin_token')
        })
    }

    const formData: FormData = new FormData();
    formData.append('title', product.title);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', file, file.name);
    return this.http.post(`${this.adminProductApiUrl}/add.json`, formData, httpOptions).pipe(
        tap(emission => {
            
        }),
        catchError(val => of(''))
    ); 
  }
}


