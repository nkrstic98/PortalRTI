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

  fajlovi_predavanja: FileInfo[];
  fajlovi_vezbe: FileInfo[];
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

export class FileInfo {
  filename: string;
  type: string;
  date: Number;
  size: Number;
  author: string;
  authorName: string;
}
