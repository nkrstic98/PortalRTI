import express from 'express';
import User from '../model/user';
import Worker from '../model/worker';
import Student from '../model/student';

const router = express.Router();

const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
const storage = multer.memoryStorage()

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: any, arg1: boolean) => void) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: fileFilter
});

router.route('/login').post((req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne(
    {'username':username, 'password':password},
    (err: any, user: any) => {
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
    (err: any, user: { save: () => Promise<any>; }) => {
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
      (err: any, worker: { save: () => void; }) => {
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

router.route('/registerStudent').post((req, res, next) => {
  Student.findOne(
    {'username': req.body.username},
    (err: any, student: any) => {
      try{
        if(student) {
          throw 'Korisničko ime "' + req.body.username + '" je zauzeto';
        }
        else {
          let newStudent = new Student(req.body);
          newStudent.save();

          const userData = {
            username: req.body.username,
            password: req.body.password,
            default_pass: true,
            type: 2
          }

          let newUser = new User(userData);
          newUser.save();

          res.json({});
        }
      }
      catch (err) {
        next(err);
      }
    }
  );
})

router.post('/registerWorker', upload.single('workerImage'), async (req, res, next) => {
  console.log(req.body);
  // @ts-ignore
  console.log(req.file);

  if(req.file != null) {

    fs.access('./uploads/worker_images', (err: any) => {
      if(err) {
        fs.mkdirSync('./uploads/worker_images')
      }
    })

    // @ts-ignore
    await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/worker_images/' + req.file.originalname)
  }

  Worker.findOne(
    {'username': req.body.username},
    (err: any, worker: any) => {
      if(err) {
        res.json(err);
      }

      if(worker) {
        res.json(worker);
      }
      else {
        let newWorker = new Worker(req.body);
        newWorker.save();

        const userData = {
          username: req.body.username,
          password: req.body.password,
          default_pass: true,
          type: 1
        }

        let newUser = new User(userData);
        newUser.save();

        res.json(null);
      }
    }
  );
})


module.exports = router;
