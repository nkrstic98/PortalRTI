import express from 'express';
import User from '../model/user';
import Worker from '../model/worker';

const router = express.Router();

const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');

const storage = multer.memoryStorage()

const fileFilter = (req: any, file: { mimetype: string; }, cb: (arg0: any, arg1: boolean) => void) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5
  // },
  fileFilter: fileFilter
});

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
        status: 'aktivan'
      }
    }
    else {
      criteria = {
        status: 'aktivan'
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

router.post('/update', upload.single('workerImage'), async (req, res, next) => {

  fs.access('./uploads/worker_images', (err: any) => {
    if(err) {
      fs.mkdirSync('./uploads/worker_images')
    }
  })

  // @ts-ignore
  await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/worker_images/' + req.file.originalname)

  Worker.findOneAndUpdate({username:req.body.username}, req.body)
    .then(() => {
      User.findOneAndUpdate({username: req.body.username}, {password: req.body.password})
        .then(() => res.json({}))
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

module.exports = router;
