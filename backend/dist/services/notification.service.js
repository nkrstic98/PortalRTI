"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notification_1 = __importDefault(require("../model/notification"));
const router = express_1.default.Router();
router.route('/create').post((req, res, next) => {
    let newNotif = new notification_1.default(req.body);
    newNotif.save()
        .then(() => res.json({}))
        .catch(err => res.json(err));
});
router.route('/').get((req, res, next) => {
    notification_1.default.find()
        .then(notif => res.json(notif))
        .catch(err => next(err));
});
module.exports = router;
//# sourceMappingURL=notification.service.js.map