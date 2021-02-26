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
const list_1 = __importDefault(require("../model/list"));
const router = express_1.default.Router();
const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');
const storage = multer.memoryStorage();
const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
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
        }
        catch (err) {
            console.error(err);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileUpload = multer({
    storage: fileStorage
});
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
    let path = './uploads/worker_images';
    fs.unlink(path + '/' + req.body.image, (err) => {
        if (err)
            throw err;
        console.log('Fajl obrisan');
    });
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
    console.log(req.body);
    // @ts-ignore
    console.log(req.file);
    if (req.file != null) {
        fs.access('./uploads/worker_images', (err) => {
            if (err) {
                fs.access('./uploads', (err) => {
                    if (err) {
                        fs.mkdirSync('./uploads');
                    }
                    fs.mkdirSync('./uploads/worker_images');
                });
            }
        });
        // @ts-ignore
        yield sharp(req.file.buffer).resize({ width: 300, height: 300 }).toFile('./uploads/worker_images/' + req.file.originalname);
    }
    worker_1.default.findOneAndUpdate({ username: req.body.username }, req.body)
        .then(() => {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password })
            .then(() => res.json({}))
            .catch(err => next(err));
    })
        .catch(err => next(err));
}));
router.post('/lists', (req, res) => {
    list_1.default.find()
        .then(lists => {
        console.log(lists);
        res.json(lists);
    })
        .catch(err => console.log(err));
});
router.route('/submitList').post((req, res, next) => {
    console.log(req.body.list);
    list_1.default.collection.insertOne(req.body.list)
        .then(() => res.json({}))
        .catch(error => res.json(error));
});
router.post('/updateList', (req, res, next) => {
    console.log(req.body.lista);
    list_1.default.collection.updateOne({ naziv: req.body.lista.naziv }, {
        $set: {
            spisak_otvoren: req.body.lista.spisak_otvoren,
            prijavljeni: req.body.lista.prijavljeni
        }
    }, {
        upsert: true
    })
        .then(result => res.json({}))
        .catch(error => res.json(error));
});
router.post('/signUpToList/:naziv', fileUpload.single('file'), (req, res, next) => {
    console.log(req.body);
    let spisak = JSON.parse(req.body.spisak);
    list_1.default.collection.updateOne({ naziv: spisak.naziv }, {
        $set: {
            prijavljeni: spisak.prijavljeni
        }
    }, {
        upsert: true
    })
        .then(result => res.json({}))
        .catch(error => res.json(error));
});
module.exports = router;
//# sourceMappingURL=worker.service.js.map