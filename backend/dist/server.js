"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const worker_1 = __importDefault(require("./model/worker"));
const student_1 = __importDefault(require("./model/student"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/rti_database');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Mongo connection open');
});
const router = express_1.default.Router();
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
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map