import express from 'express';
import Subject from '../model/subject';
import Worker from '../model/worker';
import User from '../model/user';

const router = express.Router();

const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/lectures');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

const upload = multer({
  storage: storage
});

router.route('/').get((req, res, next) => {
  Subject.find()
    .then(notif => res.json(notif))
    .catch(err => next(err));
})

router.route('/:sifra').get((req, res, next) => {
  Subject.findOne({sifra: req.params.sifra})
    .then(subject => res.json(subject))
    .catch(err => next(err))
})

router.route('/addSubject').post((req, res, next) => {
  Subject.findOne(
    {'sifra': req.body.sifra},
    (err, subject) => {
      if(err) {
        res.json(err);
      }

      if(subject) {
        res.json(subject);
      }
      else {
        let newSubject = new Subject(req.body);
        newSubject.save();

        res.json(null);
      }
    }

  )
})

router.route('/delete').post((req, res, next) => {
  Subject.deleteOne({sifra:req.body.sifra})
    .then(() => res.json({}))
    .catch((err => next(err)));
})

router.route('/edit').post((req, res, next) => {
  Subject.findOneAndUpdate({sifra:req.body.sifra}, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
})

router.post('/upload', upload.array('uploads[]'), async (req, res, next) => {
  console.log(req.files);
  console.log(req.body);

  // if(req.files != null) {
    // fs.access('./uploads/' + req.body.dir, err => {
    //   if(err) {
    //     fs.mkdirSync('./uploads/' + req.body.dir);
    //   }
    // })

    let creationTime = Date.now();
    let date = new Date(creationTime);
    let savedDate = date.toLocaleDateString();

    let fileInfo = [];

    let file;
    for(let i = 0; i < req.files.length; i++) {
      file = {
        filename: req.files[i].originalname,
        type: req.files[i].originalname.substr(req.files[i].originalname.lastIndexOf('.') + 1),
        date: savedDate,
        size: (req.files[i].size / 1024).toFixed(),
        author: req.body.teacher,
        authorName: req.body.authorName
      }

      fileInfo.push(file);

      // await sharp(req.files[i].buffer).toFile('./uploads/' + req.body.dir + '/' + req.files[i].originalname);
    }

    console.log(fileInfo);

    //U zavisnosti od destinacionog foldera, dodaju se elementi u razlicite nizove
    switch(req.body.destination_array)
    {
      case 'fajlovi_predavanja':
        Subject.findOneAndUpdate(
          {sifra: req.body.subject},
          {
            $addToSet: {
              fajlovi_predavanja : fileInfo
            }
          }
        )
          .then(res1 => res.json(res1))
          .catch(err => res.json(err))
        break;

      case 'fajlovi_vezbe' :
        Subject.findOneAndUpdate(
          {sifra: req.body.subject},
          {
            $addToSet: {
              fajlovi_vezbe : fileNames
            }
          }
        )
          .then(res1 => res.json(res1))
          .catch(err => res.json(err))
        break;

      case 'fajlovi_lab' :
        Subject.findOneAndUpdate(
          {sifra: req.body.subject},
          {
            $addToSet: {
              fajlovi_lab : fileNames
            }
          }
        )
          .then(res1 => res.json(res1))
          .catch(err => res.json(err))
        break;

      case 'fajlovi_projekat':
        Subject.findOneAndUpdate(
          {sifra: req.body.subject},
          {
            $addToSet: {
              fajlovi_projekat : fileNames
            }
          }
        )
          .then(res1 => res.json(res1))
          .catch(err => res.json(err))
        break;
    }
  // }
})

module.exports = router;
