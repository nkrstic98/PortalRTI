"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const subject_1 = __importDefault(require("../model/subject"));
const router = express_1.default.Router();
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
module.exports = router;
//# sourceMappingURL=subject.service.js.map