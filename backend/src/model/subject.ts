import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Subject = new Schema({
  sifra: {
    type: String,
    unique: true,
    required: true
  },
  naziv: {
    type: String,
    required: true
  },
  espb: {
    type: Number,
    required: true
  },
  odseci: {
    type: Array,
    required: true
  },
  predavanja : {
    type: Number,
    required: true
  },
  vezbe : {
    type: Number,
    required: true
  },
  don : {
    type: Number,
    required: true
  },
  cilj: String,
  ishod: String,
  info_lab: String,
  info_polaganje: String,
  propozicije: String,
  obavestenja: Array
});

export default mongoose.model('Subject', Subject, 'predmeti');
