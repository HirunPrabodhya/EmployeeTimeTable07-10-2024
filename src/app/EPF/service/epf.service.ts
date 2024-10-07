import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../app.config';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { IEmployee } from '../model/epf';

@Injectable({
  providedIn: 'root'
})
export class EpfService {
    private http:HttpClient = inject(HttpClient);
    private baseUrl:string = inject(BASE_URL)
    getEmployees():Observable<IEmployee[]>{
      return this.http.get<IEmployee[]>(this.baseUrl)
                      .pipe(
                        tap(data=>console.log('service: ',data)),
                        catchError(this.errorHandler)
                      );
    }

    
    private errorHandler(err:HttpErrorResponse):Observable<never>{
       let errorMessage = '';
       if(err.error instanceof ErrorEvent){
          errorMessage = `an error occured: ${err.error.message}`;
       }
       else{
         errorMessage = `Server returned code: ${err.status}, error message is: ${err.statusText}`;
       }
        return throwError(()=>errorMessage);
    }
}
