import express from 'express';
import Subject from '../model/subject';

const router = express.Router();

router.route('/').get((req, res, next) => {
  Subject.find()
    .then(notif => res.json(notif))
    .catch(err => next(err));
})

module.exports = router;
