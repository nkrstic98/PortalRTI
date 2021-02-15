"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../model/user"));
const worker_1 = __importDefault(require("../model/worker"));
const router = express_1.default.Router();
const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');
const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
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
    worker_1.default.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});
router.route('/filter/:data').get((req, res, next) => {
    let criteria;
    let data = JSON.parse(req.params.data);
    if (data.active == true) {
        if (data.type != null) {
            criteria = {
                title: data.type,
                status: 'aktivan'
            };
        }
        else {
            criteria = {
                status: 'aktivan'
            };
        }
    }
    else {
        if (data.type != null) {
            criteria = {
                title: data.type
            };
        }
        else {
            criteria = {};
        }
    }
    worker_1.default.find(criteria)
        .then(users => res.json(users))
        .catch((err => next(err)));
});
router.route('/delete').post((req, res, next) => {
    worker_1.default.deleteOne({ username: req.body.username })
        .then(() => {
        user_1.default.deleteOne({ username: req.body.username })
            .then(() => res.json({}))
            .catch((err => next(err)));
    })
        .catch((err => next(err)));
});
router.route('/:username').get((req, res, next) => {
    worker_1.default.findOne({ username: req.params.username })
        .then(user => res.json(user))
        .catch(err => next(err));
});
router.post('/update', upload.single('workerImage'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.file);
    console.log(req.body);
    fs.access('./uploads/worker_images', (err) => {
        if (err) {
            fs.mkdirSync('./uploads/worker_images');
        }
    });
    // @ts-ignore
    yield sharp(req.file.buffer).resize({ width: 300, height: 300 }).toFile('./uploads/worker_images/' + req.file.originalname);
    worker_1.default.findOneAndUpdate({ username: req.body.username }, req.body)
        .then(() => {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password })
            .then(() => res.json({}))
            .catch(err => next(err));
    })
        .catch(err => next(err));
}));
module.exports = router;
//# sourceMappingURL=worker.service.js.map