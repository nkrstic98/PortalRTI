import express from 'express';
import Schedule from '../model/schedule';
import schedule from '../model/schedule';

const router = express.Router();

router.route('/addSchedule').post((req, res) => {

  Schedule.collection.updateOne(
    { predmet: req.body.schedule.predmet },
    {
      $set: req.body.schedule
    },
    {
      upsert: true
    }
  )
    .then(() => res.json({}))
    .catch(error => res.json(error));
})

router.route('/get/:subject').get((req, res) => {
  Schedule.collection.findOne(
    { predmet : req.params.subject },
    (err, schedule) => {
      if(schedule) {
        res.json(schedule);
      }
      else {
        res.json(null);
      }
    }
  )
})

router.route('/').get((req, res) => {
  Schedule.find()
    .then(schedule => res.json(schedule))
    .catch(err => res.json(err));
})

module.exports = router;
