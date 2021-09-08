export class UserTypeModel {

    constructor(
        public userTypeId?: number,
        public userType?: string,
        public createdBy?: number,
        public createdAt?: Date,
        public updatedBy?: number,
        public updatedAt?: Date,
        public disabledBy?: number,
        public disabledAt?: Date,
        public active?: number,

    ) { }
}