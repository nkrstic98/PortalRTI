import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import user from './model/user';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/rti_database');

const conn = mongoose.connection;

conn.once('open', () => {
  console.log('Mongo connection open');
});

const router = express.Router();

router.route('/login').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  user.findOne(
    {'username':username, 'password':password},
    (err, user) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json(user);
      }
    });
});

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
