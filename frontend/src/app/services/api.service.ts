import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { retry, catchError,map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // common method to get 
  public getAll(url):Observable<any>{
    return this.http.get(`http://localhost:3000/${url}`)
    .pipe(map((response:any)=>{
        if(!response.isError){
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  // common method for post
  post(url,argBody):Observable<any>{
    return this.http.post(`http://localhost:3000/${url}`,JSON.stringify(argBody),this.httpOptions)
    .pipe(map((response:any)=>{
        if(!response.isError){
         
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  // common method for Update/PUT
  update(url,argBody,argId):Observable<any>{
    return this.http.put(`http://localhost:3000/${url}/${argId}`,JSON.stringify(argBody),this.httpOptions)
    .pipe(map((response:any)=>{
        if(!response.isError){
         
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  // common method for DELETE
  delete(url,id):Observable<any>{
    return this.http.delete(`http://localhost:3000/${url}/${id}`,this.httpOptions)
    .pipe(map((response:any)=>{
        if(!response.isError){
         
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  // common method for GET with params
  getById(url,id):Observable<any>{
    return this.http.get(`http://localhost:3000/${url}/${id}`,this.httpOptions)
    .pipe(map((response:any)=>{
        if(!response.isError){
         
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  private errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
