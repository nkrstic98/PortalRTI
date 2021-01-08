"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("../model/user"));
const worker_1 = __importDefault(require("../model/worker"));
const router = express_1.default.Router();
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
router.route('/update').post((req, res, next) => {
    worker_1.default.findOneAndUpdate({ username: req.body.username }, req.body)
        .then(() => {
        user_1.default.findOneAndUpdate({ username: req.body.username }, { password: req.body.password, default_pass: true })
            .then(() => res.json({}))
            .catch(err => next(err));
    })
        .catch(err => next(err));
});
module.exports = router;
//# sourceMappingURL=worker.service.js.map