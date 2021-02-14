export class Subject {
  sifra: String;
  naziv: String;
  tip: String;
  espb: Number;
  semestar: Number;
  odseci: String[];
  predavanja: Number;
  vezbe: Number;
  don: Number;
  cilj: String;
  ishod: String;
  info_lab: String;
  info_polaganje: String;
  propozicije: String;
  obavestenja: Information[];
}

export class Information {
  naslov: String;
  tekst: String;
  datum: Date;
  fajlovi: String[];
}
