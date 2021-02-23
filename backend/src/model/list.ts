import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let List = new Schema({
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
  limit: Number,
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
  fajlov: {
    type: Boolean,
    required: true
  },
})

export default mongoose.model('List', List, 'spiskovi');
