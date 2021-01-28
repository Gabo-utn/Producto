import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../core/api-service';
import { AppConfigService } from '../core/config.service';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService
  extends ApiService<Cliente>{
  constructor(
    protected http: HttpClient,
    protected app: AppConfigService
  ) {
    super("cliente.php", http, app);
  }
}







/*
export class ClienteService {

  private url = 'http://localhost:8888/cliente.php';

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
            .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<any> {
    return this.http.delete
      (`${this.url}/${id}`)
        .pipe(catchError(this.handleError));
  }

  put(cliente: Cliente): Observable<any> {
    let payload = JSON.stringify(cliente);
    return this.http.put<Cliente>(this.url, payload)
      .pipe(catchError(this.handleError))
  }

  post(cliente: Cliente): Observable<any> {
    let payload = JSON.stringify(cliente);
    return this.http.post<Cliente>(this.url, payload)
      .pipe(catchError(this.handleError))
  }



    public handleError(err: Response) {
    alert(err.statusText);
    return of([]);
  }
}
*/
