export class List {
  naziv: string;
  termin: string;
  mesto_odrzavanja: string;
  limit?: number;
  prijavljeni: Array<Prijava>;
  spisak_otvoren: boolean;
  rok_za_prijavu: string;
  fajlovi: boolean;
  autor: string;
}

export class Prijava {
  student: string;
  fajl?: string;
}
