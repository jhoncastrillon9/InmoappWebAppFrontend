import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StateModel } from 'src/app/models/Commons/state.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Commons/state/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(state: StateModel): Observable<StateModel>{
    let params = new HttpParams();
    if (state.stateId != null) { params = params.append('stateId', state.stateId.toString()); }
    if (state.stateName != null) { params = params.append('stateName', state.stateName.toString()); }

    const url = environment.URL_SER_NODE + `Commons/state`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(state: StateModel): Observable<StateModel>{
    let params = new HttpParams();
    if (state.stateId != null) { params = params.append('stateId', state.stateId.toString()); }
    if (state.stateName != null) { params = params.append('stateName', state.stateName.toString()); }

    const url = environment.URL_SER_NODE + `Commons/state/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(state: StateModel) {
    const url = environment.URL_SER_NODE + `Commons/state`;
    const res = this.http.post(url, {
      stateName: state.stateName
     });
    return res;
  }

  update(state: StateModel) {
    const url = environment.URL_SER_NODE + `Commons/state`;
    const res = this.http.put(url, {
      stateId: state.stateId,
      stateName: state.stateName
    });
    return res;
  }

  enable(stateId: number) {
    const url = environment.URL_SER_NODE + `Commons/state/enable`;
    const res = this.http.put(url, {
      stateId: stateId
    });
    return res;
  }

  disable(stateId: number) {
    const url = environment.URL_SER_NODE + `Commons/state/disable`;
    const res = this.http.put(url, {
      stateId: stateId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Commons/state/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

