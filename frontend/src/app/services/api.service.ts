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

  conso

  // common method to get 
  public getAll(url):Observable<any>{
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.get(`./${url}`,{headers:headers})
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
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.post(`./${url}`,JSON.stringify(argBody),{headers:headers})
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
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.put(`./${url}/${argId}`,JSON.stringify(argBody),{headers:headers})
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
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.delete(`./${url}/${id}`,{headers:headers})
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
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.get(`./${url}/${id}`,{headers:headers})
    .pipe(map((response:any)=>{
        if(!response.isError){
         
          return response.data
        }
        catchError(this.errorHandl);
    }),
      catchError(this.errorHandl)
    )
  }

  public getAvailableSeats(argBody){
    const token=localStorage.getItem("authtoken")||'';
    let headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this.http.post(`./api/bookingavilable`,JSON.stringify(argBody),{headers:headers})
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
