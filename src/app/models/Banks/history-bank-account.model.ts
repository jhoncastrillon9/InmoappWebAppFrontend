export class HistoryBankAccountModel {

  constructor(
    public historyBankAccountId?: number,
    public paymentTypeId?: number,
    public value?: number,
    public bankAccountId?: number,
    public accountsToPayContractsId?: number,
    public accountsToReceivableContractsId?: number,
    public obervation?: string,
    public compayId?: number,

  ) { }
}

