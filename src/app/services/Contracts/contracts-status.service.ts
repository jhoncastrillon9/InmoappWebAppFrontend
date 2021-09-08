import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContractsStatusModel } from 'src/app/models/Contracts/contracts-status.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractsStatusService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(contractsStatus: ContractsStatusModel): Observable<ContractsStatusModel>{
    let params = new HttpParams();
    if (contractsStatus.contractsStatusId != null) { params = params.append('contractsStatusId', contractsStatus.contractsStatusId.toString()); }
    if (contractsStatus.contractsStatusName != null) { params = params.append('contractsStatusName', contractsStatus.contractsStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/contractsStatus`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(contractsStatus: ContractsStatusModel): Observable<ContractsStatusModel>{
    let params = new HttpParams();
    if (contractsStatus.contractsStatusId != null) { params = params.append('contractsStatusId', contractsStatus.contractsStatusId.toString()); }
    if (contractsStatus.contractsStatusName != null) { params = params.append('contractsStatusName', contractsStatus.contractsStatusName.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/contractsStatus/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(contractsStatus: ContractsStatusModel) {
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus`;
    const res = this.http.post(url, {
      contractsStatusName: contractsStatus.contractsStatusName
     });
    return res;
  }

  update(contractsStatus: ContractsStatusModel) {
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus`;
    const res = this.http.put(url, {
      contractsStatusId: contractsStatus.contractsStatusId,
      contractsStatusName: contractsStatus.contractsStatusName
    });
    return res;
  }

  enable(contractsStatusId: number) {
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus/enable`;
    const res = this.http.put(url, {
      contractsStatusId: contractsStatusId
    });
    return res;
  }

  disable(contractsStatusId: number) {
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus/disable`;
    const res = this.http.put(url, {
      contractsStatusId: contractsStatusId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Contracts/contractsStatus/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

