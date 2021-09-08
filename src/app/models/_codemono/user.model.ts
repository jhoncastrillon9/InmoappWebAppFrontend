export class UserModel {

  constructor(
    public userId?: number,
    public firstName?: string,
    public lastName?: string,
    public userTypeId?: number,
    public username?: string,
    public password?: string,
    public avatar?: string,
    public createdBy?: number,
    public createdAt?: Date,
    public updatedBy?: number,
    public updatedAt?: Date,
    public disabledBy?: number,
    public disabledAt?: Date,
    public active?: number,

    public token?: string

  ) { }
}
