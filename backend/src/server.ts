import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rti_database');

const conn = mongoose.connection;

conn.once('open', () => {
  console.log('Mongo connection open');
});

app.use('/account', require('./services/account.service'));
app.use('/students', require('./services/student.service'));
app.use('/workers', require('./services/worker.service'));
app.use('/notifications', require('./services/notification.service'));
app.use('/subjects', require('./services/subject.service'));

app.listen(4000, () => console.log(`Express server running on port 4000`));
