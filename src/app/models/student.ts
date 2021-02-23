export class Student {
  username: string;
  password: string;
  index: string;
  type: string;
  firstname: string;
  lastname: string;
  status: string;
  subjects: string[];

  //inicijalizacija objekta tipa Student
  constructor(init?:Partial<Student>) {
    Object.assign(this, init);
  }
}
