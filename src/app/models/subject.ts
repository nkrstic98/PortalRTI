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
  info_projekat: string;
  propozicije: string;

  obavestenja: Information[];

  fajlovi_predavanja: FileInfo[];
  fajlovi_vezbe: FileInfo[];
  fajlovi_ispit: FileInfo[];
  fajlovi_lab: FileInfo[];
  fajlovi_projekat: FileInfo[];

  prikazi_ispit: boolean;
  prikazi_lab: boolean;
  prikazi_projekat: boolean;
}

export class Odsek {
  modul: string;
  tip: string;
  semestar: Number;
}

export class Information {
  id: Number;
  naslov: string;
  tekst: string;
  datum: string;
  fajlovi: string[];
  autor: string;
}

export class FileInfo {
  filename: string;
  type: string;
  date: Number;
  size: Number;
  author: string;
  authorName: string;
}
