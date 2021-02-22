export class Schedule {
  predmet: string;
  odsek: string;
  predavanja: Array<Termin>;
  vezbe: Array<Termin>;
}

export class Termin {
  dan: string;
  grupa: string;
  tip: string;
  pocetak: string;
  kraj: string;
  zaposleni: Array<string>
}
