import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  url = 'https://testbankapi.firebaseio.com/clients.json';
  apiKey = ''; // <-- Enter your own key here!
 
  /**
   * Constructor of the Service with Dependency Injection
   * @param http The standard Angular HttpClient to make requests
   */
  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(this.url + '');
  }
  getClient(identification): Observable<any> {
    return this.http.get(this.url, identification);
  }
  registerClient(data) {
    return this.http.post(this.url + '', data);
  }
}
