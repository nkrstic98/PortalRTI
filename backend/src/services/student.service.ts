import express from 'express';
import Student from '../model/student';

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

module.exports = router;
