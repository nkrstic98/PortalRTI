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
const student_1 = __importDefault(require("../model/student"));
const router = express_1.default.Router();
const sharp = require("sharp");
const multer = require("multer");
const fs = require('fs');
// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './uploads/');
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname);
//   }
// });
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
    // limits: {
    //   fileSize: 1024 * 1024 * 5
    // },
    fileFilter: fileFilter
});
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});
router.route('/changePass').put((req, res) => {
    const userParam = {
        password: req.body.password,
        default_pass: false
    };
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (user) {
            Object.assign(user, userParam);
            user.save()
                .then(r => res.json(r))
                .catch(err => res.json(err));
        }
        else {
            res.json(err);
        }
    });
    if (req.body.type == 1) {
        worker_1.default.findOne({ 'username': req.body.username }, (err, worker) => {
            if (worker) {
                Object.assign(worker, { password: req.body.password });
                worker.save();
            }
            else {
                res.json(err);
            }
        });
    }
    if (req.body.type == 2) {
        student_1.default.findOne({ 'username': req.body.username }, (err, student) => {
            if (student) {
                Object.assign(student, { password: req.body.password });
                student.save();
            }
            else {
                res.json(err);
            }
        });
    }
});
router.route('/registerStudent').post((req, res, next) => {
    student_1.default.findOne({ 'username': req.body.username }, (err, student) => {
        try {
            if (student) {
                throw 'Korisničko ime "' + req.body.username + '" je zauzeto';
            }
            else {
                let newStudent = new student_1.default(req.body);
                newStudent.save();
                const userData = {
                    username: req.body.username,
                    password: req.body.password,
                    default_pass: true,
                    type: 2
                };
                let newUser = new user_1.default(userData);
                newUser.save();
                res.json({});
            }
        }
        catch (err) {
            next(err);
        }
    });
});
router.post('/registerWorker', upload.single('workerImage'), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    console.log(req.body);
    console.log(req.file);
    fs.access('./uploads/worker_images', (err) => {
        if (err) {
            fs.mkdirSync('./uploads/worker_images');
        }
    });
    yield sharp(req.file.buffer).resize({ width: 300, height: 300 }).toFile('./uploads/worker_images/' + req.file.originalname);
    worker_1.default.findOne({ 'username': req.body.username }, (err, worker) => {
        if (err) {
            res.json(err);
        }
        if (worker) {
            res.json(worker);
        }
        else {
            let newWorker = new worker_1.default(req.body);
            newWorker.save();
            const userData = {
                username: req.body.username,
                password: req.body.password,
                default_pass: true,
                type: 1
            };
            let newUser = new user_1.default(userData);
            newUser.save();
            res.json(null);
        }
    });
}));
module.exports = router;
//# sourceMappingURL=account.service.js.map