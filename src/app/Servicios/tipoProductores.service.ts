import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoProductores } from '../Clases/tipoProductores';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoresService {
  api="https://localhost:44349/api/tipoProductores/";
  constructor(
    private http:HttpClient
  ) { }

  listar():Observable<TipoProductores[]>
  {
    return this.http.get<TipoProductores[]>(this.api);
  }

}
