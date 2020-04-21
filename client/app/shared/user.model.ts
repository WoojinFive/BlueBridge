export class User {
  constructor(
    public _id: string,
    public personalInfo: any,
    public employeeInfo: any,
    public email: string,
    public password: string,
    public firstName: string,
    public lastName: string,
    public isLogin: boolean,
    public isApproved: boolean,
    public condition: string
  ) {}
}
