import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContractModel } from 'src/app/models/Contracts/contract.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(private http: HttpClient) { }

  get(id: number){
    const url = environment.URL_SER_NODE + `Contracts/contract/${id}`;
    const res = this.http.get(url);
    return res;
  }

  getAll(contract: ContractModel): Observable<ContractModel>{
    let params = new HttpParams();
    if (contract.contractId != null) { params = params.append('contractId', contract.contractId.toString()); }
    if (contract.observation != null) { params = params.append('observation', contract.observation.toString()); }
    if (contract.statusId != null) { params = params.append('statusId', contract.statusId.toString()); }
    if (contract.propertyId != null) { params = params.append('propertyId', contract.propertyId.toString()); }
    if (contract.tenantId != null) { params = params.append('tenantId', contract.tenantId.toString()); }
    if (contract.compayId != null) { params = params.append('compayId', contract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/contract`;
    const res = this.http.get(url, { params });
    return res;
  }

  getList(contract: ContractModel): Observable<ContractModel>{
    let params = new HttpParams();
    if (contract.contractId != null) { params = params.append('contractId', contract.contractId.toString()); }
    if (contract.observation != null) { params = params.append('observation', contract.observation.toString()); }
    if (contract.statusId != null) { params = params.append('statusId', contract.statusId.toString()); }
    if (contract.propertyId != null) { params = params.append('propertyId', contract.propertyId.toString()); }
    if (contract.tenantId != null) { params = params.append('tenantId', contract.tenantId.toString()); }
    if (contract.compayId != null) { params = params.append('compayId', contract.compayId.toString()); }

    const url = environment.URL_SER_NODE + `Contracts/contract/list`;
    const res = this.http.get(url, { params });
    return res;
  }

  create(contract: ContractModel) {
    const url = environment.URL_SER_NODE + `Contracts/contract`;
    const res = this.http.post(url, {
      contractDate: contract.contractDate,
      innitialDate: contract.innitialDate,
      quantityMonths: contract.quantityMonths,
      rentalFeeForOwner: contract.rentalFeeForOwner,
      rentalFeeForTennat: contract.rentalFeeForTennat,
      observation: contract.observation,
      statusId: contract.statusId,
      propertyId: contract.propertyId,
      tenantId: contract.tenantId,
      compayId: contract.compayId
     });
    return res;
  }

  update(contract: ContractModel) {
    const url = environment.URL_SER_NODE + `Contracts/contract`;
    const res = this.http.put(url, {
      contractId: contract.contractId,
      contractDate: contract.contractDate,
      innitialDate: contract.innitialDate,
      quantityMonths: contract.quantityMonths,
      rentalFeeForOwner: contract.rentalFeeForOwner,
      rentalFeeForTennat: contract.rentalFeeForTennat,
      observation: contract.observation,
      statusId: contract.statusId,
      propertyId: contract.propertyId,
      tenantId: contract.tenantId,
      compayId: contract.compayId
    });
    return res;
  }

  enable(contractId: number) {
    const url = environment.URL_SER_NODE + `Contracts/contract/enable`;
    const res = this.http.put(url, {
      contractId: contractId
    });
    return res;
  }

  disable(contractId: number) {
    const url = environment.URL_SER_NODE + `Contracts/contract/disable`;
    const res = this.http.put(url, {
      contractId: contractId
    });
    return res;
  }

  delete(id: string) {
    const url = environment.URL_SER_NODE + `Contracts/contract/${id}`;
    const res = this.http.delete(url);
    return res;
  }

}

