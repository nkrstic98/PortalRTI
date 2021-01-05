import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Worker = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  biography : {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  office: {
    type: Number
  },
  status: {
    type: String,
    required: true
  }
});

export default mongoose.model('Worker', Worker, 'zaposleni');
