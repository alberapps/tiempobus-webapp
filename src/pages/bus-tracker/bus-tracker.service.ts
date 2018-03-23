/**
 * TiempoBus - Informacion sobre tiempos de paso de autobuses en Alicante
 * Copyright (C) 2018 Alberto Montiel
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry, tap, map } from 'rxjs/operators';



@Injectable()
export class BusTrackerService {

  trackerUrl = 'assets/tiempos_mock.xml';

  //trackerUrl = '/TiempoBusBackend/dinamica_pasoparada.jsp?parada=2503';

  constructor(private http: HttpClient) { }

  getServerData(stopNumber: string) {

    console.info('getServerData Init');

    // Add safe, URL encoded search parameter if there is a search term
    /*const options = stopNumber ?
     {
       params: new HttpParams().set('parada', stopNumber),
       responseType: 'text'
     } : {
       responseType: 'text'
     };*/

    const options = { params: new HttpParams().set('parada', stopNumber), responseType: 'text' as 'text' }

    // The Observable returned by get() is of type Observable<string>
    // because a text response was specified.
    // There's no need to pass a <string> type parameter to get().
    return this.http.get(this.trackerUrl, options)
      .pipe(
        /*tap( // Log the result or error
          //data => this.parseXmlData(data),
          error => this.handleError(error)
        ),*/
        retry(3),
        catchError(this.handleError),

      /*map(
          data => { return this.parseXmlData(data)},
      )*/

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
