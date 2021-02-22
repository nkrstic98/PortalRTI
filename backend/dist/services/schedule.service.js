"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schedule_1 = __importDefault(require("../model/schedule"));
const router = express_1.default.Router();
router.route('/addSchedule').post((req, res) => {
    schedule_1.default.collection.updateOne({ predmet: req.body.schedule.predmet }, {
        $set: req.body.schedule
    }, {
        upsert: true
    })
        .then(() => res.json({}))
        .catch(error => res.json(error));
});
router.route('/get/:subject').get((req, res) => {
    schedule_1.default.collection.findOne({ predmet: req.params.subject }, (err, schedule) => {
        if (schedule) {
            res.json(schedule);
        }
        else {
            res.json(null);
        }
    });
});
module.exports = router;
//# sourceMappingURL=schedule.service.js.map