import express from 'express';
import User from '../model/user';
import Worker from '../model/worker';
import Spisak from '../model/list';

const router = express.Router();

const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');

const storage = multer.memoryStorage()

const fileStorage = multer.diskStorage({
  destination: function(req, file, cb) {

    let dir = './uploads/lists/' + req.params.naziv;

    try {
      if (!fs.existsSync('./uploads')) {
        fs.mkdirSync('./uploads');
      }

      if (!fs.existsSync('./uploads/lists')) {
        fs.mkdirSync('./uploads/lists');
      }

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }catch(err) {
      console.error(err)
    }
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})

const fileUpload = multer({
  storage: fileStorage
});

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
  let path = './uploads/worker_images';
  fs.unlink(path + '/' + req.body.image, (err) => {
    if(err) throw err;
    console.log('Fajl obrisan');
  })

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
  console.log(req.body);
  // @ts-ignore
  console.log(req.file);

  if(req.file != null) {
    fs.access('./uploads/worker_images', (err: any) => {
      if(err) {
        fs.access('./uploads', (err: any) => {
          if(err) {
            fs.mkdirSync('./uploads')
          }
          fs.mkdirSync('./uploads/worker_images')
        })
      }
    })

    // @ts-ignore
    await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/worker_images/' + req.file.originalname)
  }

  Worker.findOneAndUpdate({username:req.body.username}, req.body)
    .then(() => {
      User.findOneAndUpdate({username: req.body.username}, {password: req.body.password})
        .then(() => res.json({}))
        .catch(err => next(err));
    })
    .catch(err => next(err));
})

router.post('/lists',(req, res) => {
  Spisak.find()
    .then(lists => {
      console.log(lists);
      res.json(lists);
    })
    .catch(err => console.log(err));
})

router.route('/submitList').post((req, res, next) => {
  console.log(req.body.list);
  Spisak.collection.insertOne(req.body.list)
    .then(() => res.json({}))
    .catch(error => res.json(error));
})

router.post('/updateList',(req, res, next) => {
  console.log(req.body.lista);
  Spisak.collection.updateOne(
    { naziv: req.body.lista.naziv },
    {
      $set: {
        spisak_otvoren: req.body.lista.spisak_otvoren,
        prijavljeni: req.body.lista.prijavljeni
      }
    },
    {
      upsert: true
    }
  )
    .then(result => res.json({}))
    .catch(error => res.json(error));
})

router.post('/signUpToList/:naziv', fileUpload.single('file'), (req, res, next) => {
  console.log(req.body);

  let spisak = JSON.parse(req.body.spisak);

  Spisak.collection.updateOne(
    { naziv: spisak.naziv },
    {
      $set: {
        prijavljeni: spisak.prijavljeni
      }
    },
    {
      upsert: true
    }
  )
    .then(result => res.json({}))
    .catch(error => res.json(error));
})

module.exports = router;
