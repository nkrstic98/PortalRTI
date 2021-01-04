export class User {
  username: string;
  password: string;
  type: UserType;
}

export enum UserType {
  Admin,
  Worker,
  Student
}
