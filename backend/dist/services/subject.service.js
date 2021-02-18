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
const subject_1 = __importDefault(require("../model/subject"));
const router = express_1.default.Router();
const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let directory = JSON.parse(req.params.directory);
        let dir = './uploads/subjects/' + directory.subject;
        try {
            if (!fs.existsSync('./uploads')) {
                fs.mkdirSync('./uploads');
            }
            if (!fs.existsSync('./uploads/subjects')) {
                fs.mkdirSync('./uploads/subjects');
            }
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            dir = dir + '/' + directory.dir;
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
const upload = multer({
    storage: storage
});
router.route('/').get((req, res, next) => {
    subject_1.default.find()
        .then(notif => res.json(notif))
        .catch(err => next(err));
});
router.route('/:sifra').get((req, res, next) => {
    subject_1.default.findOne({ sifra: req.params.sifra })
        .then(subject => res.json(subject))
        .catch(err => next(err));
});
router.route('/addSubject').post((req, res, next) => {
    subject_1.default.findOne({ 'sifra': req.body.sifra }, (err, subject) => {
        if (err) {
            res.json(err);
        }
        if (subject) {
            res.json(subject);
        }
        else {
            let newSubject = new subject_1.default(req.body);
            newSubject.save();
            res.json(null);
        }
    });
});
router.route('/delete').post((req, res, next) => {
    subject_1.default.deleteOne({ sifra: req.body.sifra })
        .then(() => res.json({}))
        .catch((err => next(err)));
});
router.route('/edit').post((req, res, next) => {
    subject_1.default.findOneAndUpdate({ sifra: req.body.sifra }, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
});
router.post('/upload/:directory', upload.array('uploads[]'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.files);
    console.log(req.body);
    // if(req.files != null) {
    // fs.access('./uploads/' + req.body.dir, err => {
    //   if(err) {
    //     fs.mkdirSync('./uploads/' + req.body.dir);
    //   }
    // })
    let creationTime = Date.now();
    let date = new Date(creationTime);
    let savedDate = date.toLocaleDateString();
    let fileInfo = [];
    let file;
    for (let i = 0; i < req.files.length; i++) {
        file = {
            filename: req.files[i].originalname,
            type: req.files[i].originalname.substr(req.files[i].originalname.lastIndexOf('.') + 1),
            date: savedDate,
            size: (req.files[i].size / 1024).toFixed(),
            author: req.body.teacher,
            authorName: req.body.authorName
        };
        fileInfo.push(file);
        // await sharp(req.files[i].buffer).toFile('./uploads/' + req.body.dir + '/' + req.files[i].originalname);
    }
    console.log(fileInfo);
    //U zavisnosti od destinacionog foldera, dodaju se elementi u razlicite nizove
    switch (req.body.destination_array) {
        case 'fajlovi_predavanja':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $addToSet: {
                    fajlovi_predavanja: fileInfo
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_vezbe':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $addToSet: {
                    fajlovi_vezbe: fileNames
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_lab':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $addToSet: {
                    fajlovi_lab: fileNames
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_projekat':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $addToSet: {
                    fajlovi_projekat: fileNames
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
    }
    // }
}));
router.route('/deleteFile').post((req, res, next) => {
    fs.unlink('./uploads/subjects/' + req.body.subject + '/' + req.body.location + '/' + req.body.file.filename, (err) => {
        if (err)
            throw err;
        console.log('Fajl obrisan');
    });
    switch (req.body.dst) {
        case 'fajlovi_predavanja':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $pull: {
                    fajlovi_predavanja: req.body.file
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_vezbe':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $pull: {
                    fajlovi_vezbe: req.body.file
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_lab':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $pull: {
                    fajlovi_lab: req.body.file
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
        case 'fajlovi_projekat':
            subject_1.default.findOneAndUpdate({ sifra: req.body.subject }, {
                $pull: {
                    fajlovi_projekat: req.body.file
                }
            })
                .then(res1 => res.json(res1))
                .catch(err => res.json(err));
            break;
    }
});
module.exports = router;
//# sourceMappingURL=subject.service.js.map