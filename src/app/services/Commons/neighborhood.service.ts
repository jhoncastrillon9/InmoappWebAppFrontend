import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NeighborhoodModel } from 'src/app/models/Commons/neighborhood.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NeighborhoodService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Commons/neighborhood/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(neighborhood: NeighborhoodModel): Observable<NeighborhoodModel>{
    let params = new HttpParams();
    if (neighborhood.neighborhoodId != null) { params = params.append('neighborhoodId', neighborhood.neighborhoodId.toString()); }
    if (neighborhood.neighborhoodName != null) { params = params.append('neighborhoodName', neighborhood.neighborhoodName.toString()); }
    if (neighborhood.zoneId != null) { params = params.append('zoneId', neighborhood.zoneId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/neighborhood`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(neighborhood: NeighborhoodModel): Observable<NeighborhoodModel>{
    let params = new HttpParams();
    if (neighborhood.neighborhoodId != null) { params = params.append('neighborhoodId', neighborhood.neighborhoodId.toString()); }
    if (neighborhood.neighborhoodName != null) { params = params.append('neighborhoodName', neighborhood.neighborhoodName.toString()); }
    if (neighborhood.zoneId != null) { params = params.append('zoneId', neighborhood.zoneId.toString()); }

    const url = environment.URL_SER_NODE + `Commons/neighborhood/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(neighborhood: NeighborhoodModel) {
    const url = environment.URL_SER_NODE + `Commons/neighborhood`;
    const res = this.http.post(url, {
      neighborhoodName: neighborhood.neighborhoodName,
      zoneId: neighborhood.zoneId
     });
    return res;
  }

  update(neighborhood: NeighborhoodModel) {
    const url = environment.URL_SER_NODE + `Commons/neighborhood`;
    const res = this.http.put(url, {
      neighborhoodId: neighborhood.neighborhoodId,
      neighborhoodName: neighborhood.neighborhoodName,
      zoneId: neighborhood.zoneId
    });
    return res;
  }

  enable(neighborhoodId: number) {
    const url = environment.URL_SER_NODE + `Commons/neighborhood/enable`;
    const res = this.http.put(url, {
      neighborhoodId: neighborhoodId
    });
    return res;
  }

  disable(neighborhoodId: number) {
    const url = environment.URL_SER_NODE + `Commons/neighborhood/disable`;
    const res = this.http.put(url, {
      neighborhoodId: neighborhoodId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Commons/neighborhood/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

