"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../model/student"));
const user_1 = __importDefault(require("../model/user"));
const router = express_1.default.Router();
router.route('/').get((req, res, next) => {
    student_1.default.find()
        .then(users => res.json(users))
        .catch(err => next(err));
});
router.route('/filter/:data').get((req, res, next) => {
    let criteria;
    let data = JSON.parse(req.params.data);
    if (data.active == true) {
        if (data.type != null) {
            criteria = {
                type: data.type,
                status: 'Aktivan'
            };
        }
        else {
            criteria = {
                status: 'Aktivan'
            };
        }
    }
    else {
        if (data.type != null) {
            criteria = {
                type: data.type
            };
        }
        else {
            criteria = {};
        }
    }
    student_1.default.find(criteria)
        .then(users => res.json(users))
        .catch((err => next(err)));
});
router.route('/delete').post((req, res, next) => {
    student_1.default.deleteOne({ username: req.body.username })
        .then(() => {
        user_1.default.deleteOne({ username: req.body.username })
            .then(() => res.json({}))
            .catch((err => next(err)));
    })
        .catch((err => next(err)));
});
router.route('/:username').get((req, res, next) => {
    student_1.default.findOne({ username: req.params.username })
        .then(user => res.json(user))
        .catch(err => next(err));
});
router.route('/update').post((req, res, next) => {
    student_1.default.findOneAndUpdate({ username: req.body.username }, req.body)
        .then(student => {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password })
            .then(() => res.json({}))
            .catch(err => next(err));
    })
        .catch(err => next(err));
});
router.route('/removeSubject').post((req, res, next) => {
    student_1.default.findOneAndUpdate({ username: req.body.username }, {
        $pull: {
            subjects: req.body.subject
        }
    })
        .then(res1 => res.json(res1))
        .catch(err => res.json(err));
});
module.exports = router;
//# sourceMappingURL=student.service.js.map