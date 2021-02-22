import express from 'express';
import Schedule from '../model/schedule';

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

module.exports = router;
