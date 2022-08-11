import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Contacto } from '../modelos/contacto';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  //readonly BASE_URL: string = 'http://localhost:5002'
  readonly BASE_URL: string = 'https://flask-crud-back1.herokuapp.com/'
  

  constructor(private http:HttpClient) { }  

  getContactos():Observable<Contacto[]>{
    return this.http.get<Contacto[]>(`${this.BASE_URL}/contactos`);
  }  

  registrarContacto(form: any){
    return this.http.post(`${this.BASE_URL}/new`,form);
  }
}
