export class Worker {
  username: string;
  password: string;
  email: string;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  website: string;
  biography: string;
  title: string;
  office: string;
  status: string;

  constructor(init?:Partial<Worker>) {
    Object.assign(this, init);
  }
}
