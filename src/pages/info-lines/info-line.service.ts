import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap, map } from 'rxjs/operators';



@Injectable()
export class InfoLineService {

  trackerUrl = 'assets/lineas_mock.xml';

  //trackerUrl = 'http://api.alberapps.com:8080/TiempoBusBackend/dinamica_pasoparada.jsp?parada=2503';

  constructor(private http: HttpClient) { }

  getServerData(stopNumber: string) {

    console.info('getServerData Init');

    const options = { params: new HttpParams().set('parada', stopNumber), responseType: 'text' as 'text' }

    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(this.trackerUrl, options)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
