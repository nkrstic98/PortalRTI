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
const notification_1 = __importDefault(require("../model/notification"));
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
    fileFilter: fileFilter
});
router.post('/create', upload.single('notifImage'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // console.log(req.body);
    // // @ts-ignore
    // console.log(req.file);
    if (req.file != null) {
        fs.access('./uploads/notifications', (err) => {
            if (err) {
                fs.mkdirSync('./uploads/notifications');
            }
        });
        // @ts-ignore
        yield sharp(req.file.buffer).resize({ width: 300, height: 300 }).toFile('./uploads/notifications/' + req.file.originalname);
    }
    let newNotif = new notification_1.default(req.body);
    newNotif.save()
        .then(() => res.json({}))
        .catch(err => res.json(err));
}));
router.route('/').get((req, res, next) => {
    notification_1.default.find()
        .then(notif => res.json(notif))
        .catch(err => next(err));
});
module.exports = router;
//# sourceMappingURL=notification.service.js.map