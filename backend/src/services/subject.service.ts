import express from 'express';
import Subject from '../model/subject';
import Worker from '../model/worker';
import User from '../model/user';

const router = express.Router();

router.route('/').get((req, res, next) => {
  Subject.find()
    .then(notif => res.json(notif))
    .catch(err => next(err));
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

module.exports = router;
