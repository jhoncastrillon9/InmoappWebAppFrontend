export class AccountsToPayContractModel {

  constructor(
    public accountsToPayContractId?: number,
    public quotaNumber?: number,
    public value?: number,
    public expirationDate?: Date,
    public accountsStatusId?: number,
    public contractId?: number,
    public compayId?: number,

  ) { }
}

