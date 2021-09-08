export class PropertyModel {

  constructor(
    public propertyId?: number,
    public idIva?: number,
    public code?: string,
    public title?: string,
    public description?: string,
    public address?: string,
    public priceOwner?: number,
    public percentage?: number,
    public feeCompany?: number,
    public recruitmentDate?: Date,
    public finalPrice?: number,
    public rooms?: number,
    public toilets?: number,
    public reception?: boolean,
    public pool?: boolean,
    public area?: number,
    public observation?: string,
    public propertyStatusId?: number,
    public cityId?: number,
    public zoneId?: number,
    public ownerId?: number,
    public propertyCategoryId?: number,
    public typeOfferId?: number,
    public compayId?: number,

  ) { }
}

