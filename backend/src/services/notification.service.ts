import express from 'express';
import Notification from '../model/notification';

const router = express.Router();

router.route('/create').post((req, res, next) => {
  let newNotif = new Notification(req.body);
  newNotif.save()
    .then(() => res.json({}))
    .catch(err => res.json(err));
})

router.route('/').get((req, res, next) => {
  Notification.find()
    .then(notif => res.json(notif))
    .catch(err => next(err));
})

module.exports = router;
