import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PoStorageService } from '@po-ui/ng-storage';

@Injectable({
  providedIn: 'root'
})
export class Service {
  user:any

  private readonly Api = `${environment.api}`

  constructor(private http:HttpClient) {
  }

  signin(user:any){
    return this.http.get<any>(this.Api+`/anunciante/findOne`, {params: user})
  }

  getPlanos(){
    return this.http.get<any>(this.Api+`/planos/find`)
  }
  setPlanos(plano:any){
    return this.http.post<any>(this.Api+`/planos/insertOne`, plano)
  }
  deletePlanos(idPlano:any){
    return this.http.delete<any>(this.Api+`/planos/deleteOne`, idPlano)
  }

  getEstados(){
    return this.http.get<any>(this.Api+`/estados/find`)
  }
  getOneEstados(estado: any){
    return this.http.post<any>(this.Api+`/estados/findOne`, estado)
  }
  setEstados(estado:any){
    return this.http.post<any>(this.Api+`/estados/insertOne`, estado)
  }

  inserOneCidades(estado:any){
    return this.http.post<any>(this.Api+`/estados/insertOneCity`, estado)
  }
  deleteCidades(name:any){
    return this.http.post<any>(this.Api+`/estados/deleteOneCity`, name)
  }

  deleteEstados(name:any){
    return this.http.post<any>(this.Api+`/estados/deleteOne`, name)
  }

  getAnunciantes(){
    return this.http.get<any>(this.Api+`/anunciante/find`)
  }
  updateAnunciante(anunciante:any){
    return this.http.put<any>(this.Api+`/anunciante/updateOne`, anunciante)
  }
}
