import express from 'express';
import Notification from '../model/notification';

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
  fileFilter: fileFilter
});

router.post('/create', upload.single('notifImage'), async (req, res, next) => {
  // console.log(req.body);
  // // @ts-ignore
  // console.log(req.file);

  if(req.file != null) {

    fs.access('./uploads/notifications', (err: any) => {
      if(err) {
        fs.mkdirSync('./uploads/notifications')
      }
    })

    // @ts-ignore
    await sharp(req.file.buffer).resize({width: 300, height: 300}).toFile('./uploads/notifications/' + req.file.originalname)
  }

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
