import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  default_pass: Boolean,
  type: {
    type: Number,
    required: true
  }
});

export default mongoose.model('User', User, 'korisnici');
