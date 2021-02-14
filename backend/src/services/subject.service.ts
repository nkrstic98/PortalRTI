import express from 'express';
import Subject from '../model/subject';

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

module.exports = router;
