import express from 'express';
import User from '../model/user';
import Worker from '../model/worker';

const router = express.Router();

router.route('/').get((req, res, next) => {
  Worker.find()
    .then(users => res.json(users))
    .catch(err => next(err));
})

router.route('/filter/:data').get((req, res, next) => {
  let criteria;

  let data = JSON.parse(req.params.data);

  if(data.active == true) {
    if(data.type != null) {
      criteria = {
        title: data.type,
        status: 'Aktivan'
      }
    }
    else {
      criteria = {
        status: 'Aktivan'
      }
    }
  }
  else {
    if(data.type != null) {
      criteria = {
        title: data.type
      }
    }
    else {
      criteria = {
      }
    }
  }

  Worker.find(criteria)
    .then(users => res.json(users))
    .catch((err => next(err)));
})

router.route('/delete').post((req, res, next) => {
  Worker.deleteOne({username:req.body.username})
    .then(() => {
      User.deleteOne({username:req.body.username})
        .then(() => res.json({}))
        .catch((err => next(err)));
    })
    .catch((err => next(err)));
})

router.route('/:username').get((req, res, next) => {
  Worker.findOne({username: req.params.username})
    .then(user => res.json(user))
    .catch(err => next(err));
})

router.route('/update').post((req, res, next) => {
  Worker.findOneAndUpdate({username:req.body.username}, req.body)
    .then(() => {
      User.findOneAndUpdate({username: req.body.username}, {password: req.body.password})
        .then(() => res.json({}))
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

module.exports = router;
