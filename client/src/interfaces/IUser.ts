export default interface IUser {
  id: number,
  name: string,
  email: string,
  password: string,
  role: string,
  token: string,
};

export enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}
