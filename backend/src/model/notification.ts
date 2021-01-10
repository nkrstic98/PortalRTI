import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Notification = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  creationTime: {
    type: Date,
    required: true,
    default: Date.now
  }
})

export default mongoose.model('Notification', Notification, 'obavestenja');
