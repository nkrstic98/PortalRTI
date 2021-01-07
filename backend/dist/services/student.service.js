"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = __importDefault(require("../model/student"));
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
module.exports = router;
//# sourceMappingURL=student.service.js.map