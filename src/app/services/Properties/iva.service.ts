import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IvaModel } from 'src/app/models/Properties/iva.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Properties/iva/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(iva: IvaModel): Observable<IvaModel>{
    let params = new HttpParams();
    if (iva.ivaId != null) { params = params.append('ivaId', iva.ivaId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/iva`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(iva: IvaModel): Observable<IvaModel>{
    let params = new HttpParams();
    if (iva.ivaId != null) { params = params.append('ivaId', iva.ivaId.toString()); }

    const url = environment.URL_SER_NODE + `Properties/iva/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(iva: IvaModel) {
    const url = environment.URL_SER_NODE + `Properties/iva`;
    const res = this.http.post(url, {
      valor: iva.valor
     });
    return res;
  }

  update(iva: IvaModel) {
    const url = environment.URL_SER_NODE + `Properties/iva`;
    const res = this.http.put(url, {
      ivaId: iva.ivaId,
      valor: iva.valor
    });
    return res;
  }

  enable(ivaId: number) {
    const url = environment.URL_SER_NODE + `Properties/iva/enable`;
    const res = this.http.put(url, {
      ivaId: ivaId
    });
    return res;
  }

  disable(ivaId: number) {
    const url = environment.URL_SER_NODE + `Properties/iva/disable`;
    const res = this.http.put(url, {
      ivaId: ivaId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Properties/iva/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

