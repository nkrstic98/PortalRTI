import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Schedule = new Schema({
  predmet: {
    type: String,
    required: true
  },
  odsek: {
    type: String,
    required: true
  },
  predavanja: {
    type: Array,
    required: true
  },
  vezbe: {
    type: Array,
    required: true
  }
})

export default mongoose.model('Schedule', Schedule, 'plan_angazovanja');
