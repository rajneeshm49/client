import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

    token;
    url = environment.url;
    isLoggedIn = false;
    justLoggedIn = false;
    name;
    userApiUrl = `${this.url}/users`;
    adminUserApiUrl = `${this.url}/admin/users`;

    constructor(private http: HttpClient) {}

    login(userCredentialsBody): any {
      const httpOptions= {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.post(`${this.userApiUrl}/login.json`, userCredentialsBody, httpOptions).pipe(
            tap((res:any) => 
                this.justLoggedIn = true
            ),

            catchError(this.handleError<any>('Error while User Login'))
        );
    }

    adminLogin(userCredentialsBody): any {
        const httpOptions= {
              headers: new HttpHeaders({'Content-Type': 'application/json'})
          };
          return this.http.post(`${this.adminUserApiUrl}/login.json`, userCredentialsBody, httpOptions).pipe(
              tap((res:any) => 
                  console.log('admin user successfully logged in')
              ),
  
              catchError(this.handleError<any>('Error while admin user Login'))
          );
      }

    register(userDataBody) {

        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.post(`${this.userApiUrl}/register.json`, userDataBody, httpOptions).pipe(
            tap((res:any) => 
                console.log('registration done')
            ),

            catchError(this.handleError<any>('Error while User registration.'))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        // console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

}