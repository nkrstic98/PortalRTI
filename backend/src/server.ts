import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import User from './model/user';
import Worker from './model/worker';
import Student from './model/student';

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

  User.findOne(
    {'username':username, 'password':password},
    (err, user) => {
      if(err) {
        console.log(err);
      }
      else {
        res.json(user);
      }
    }
    );
});

router.route('/changePass').put((req, res) => {
  const userParam = {
    password: req.body.password,
    default_pass: false
  }

  User.findOne(
    {'username':req.body.username},
    (err, user) => {
      if(user) {
        Object.assign(user, userParam);

        user.save()
          .then(r => res.json(r))
          .catch(err => res.json(err));
      }
      else {
        res.json(err);
      }
    });

  if(req.body.type == 1) {
    Worker.findOne(
      {'username': req.body.username},
      (err, worker) => {
        if(worker) {
          Object.assign(worker, {password:req.body.password});

          worker.save();
        }
        else {
          res.json(err);
        }
      }
    )
  }

  if(req.body.type == 2) {
    Student.findOne(
      {'username': req.body.username},
      (err, student) => {
        if(student) {
          Object.assign(student, {password:req.body.password});

          student.save();
        }
        else {
          res.json(err);
        }
      }
    )
  }
})

app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));
