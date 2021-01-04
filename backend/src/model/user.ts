import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
  username: String,
  password: String,
  type: Number
});

export default mongoose.model('User', User, 'korisnici');
