import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Spisak = new Schema({
  naziv: {
    type: String,
    required: true,
    unique: true
  },
  termin: {
    type: String,
    required: true
  },
  mesto_odrzavanja: {
    type: String,
    required: true
  },
  limit: {
    type: Number
  },
  prijavljeni: {
    type: Array,
    required: true
  },
  spisak_otvoren: {
    type: Boolean,
    required: true
  },
  rok_za_prijavu: {
    type: String,
    required: true
  },
  fajlovi: {
    type: Boolean,
    required: true
  },
  autor: {
    type: String,
    required: true
  }
});

export default mongoose.model('Spisak', Spisak, 'spiskovi_studenata');
