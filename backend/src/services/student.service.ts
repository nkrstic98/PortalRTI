import express from 'express';
import Student from '../model/student';
import User from '../model/user';

const router = express.Router();

router.route('/').get((req, res, next) => {
  Student.find()
    .then(users => res.json(users))
    .catch(err => next(err));
})

router.route('/filter/:data').get((req, res, next) => {
  let criteria;

  let data = JSON.parse(req.params.data);

  if(data.active == true) {
    if(data.type != null) {
      criteria = {
        type: data.type,
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
        type: data.type
      }
    }
    else {
      criteria = {
      }
    }
  }

  Student.find(criteria)
    .then(users => res.json(users))
    .catch((err => next(err)));
})

router.route('/delete').post((req, res, next) => {
  Student.deleteOne({username:req.body.username})
    .then(() => {
      User.deleteOne({username:req.body.username})
        .then(() => res.json({}))
        .catch((err => next(err)));
    })
    .catch((err => next(err)));
})

router.route('/:username').get((req, res, next) => {
  Student.findOne({username: req.params.username})
    .then(user => res.json(user))
    .catch(err => next(err));
})

router.route('/update').post((req, res, next) => {
  Student.findOneAndUpdate({username:req.body.username}, req.body)
    .then(student => {
      User.findOneAndUpdate({username: req.body.username}, {password: req.body.password})
        .then(() => res.json({}))
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

router.route('/removeSubject').post((req, res, next) => {
  Student.findOneAndUpdate(
    { username: req.body.username },
    {
      $pull: {
        subjects: req.body.subject
      }
    }
  )
    .then(res1 => res.json(res1))
    .catch(err => res.json(err))
})

module.exports = router;
