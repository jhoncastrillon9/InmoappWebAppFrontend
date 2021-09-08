export class ContractModel {

  constructor(
    public contractId?: number,
    public contractDate?: Date,
    public innitialDate?: Date,
    public quantityMonths?: number,
    public rentalFeeForOwner?: number,
    public rentalFeeForTennat?: number,
    public observation?: string,
    public statusId?: number,
    public propertyId?: number,
    public tenantId?: number,
    public compayId?: number,

  ) { }
}

