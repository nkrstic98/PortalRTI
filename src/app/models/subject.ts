export class Subject {
  sifra: string;
  naziv: string;
  tip: string;
  espb: Number;
  semestar: Number;
  odseci: Odsek[];
  predavanja: Number;
  vezbe: Number;
  don: Number;
  cilj: string;
  ishod: string;
  info_lab: string;
  info_polaganje: string;
  propozicije: string;
  obavestenja: Information[];
}

export class Odsek {
  modul: string;
  tip: string;
  semestar: Number;
}

export class Information {
  naslov: string;
  tekst: string;
  datum: Date;
  fajlovi: string[];
}
