import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Student = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  index: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
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
  status: {
    type: String,
    required: true
  },
  subjects: Array
});

export default mongoose.model('Student', Student, 'studenti');
