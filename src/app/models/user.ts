export class User {
  username: string;
  password: string;
  default_pass: boolean;
  type: UserType;
}

export enum UserType {
  Admin,
  Worker,
  Student
}
