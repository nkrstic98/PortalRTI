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
module.exports = router;
//# sourceMappingURL=subject.service.js.map