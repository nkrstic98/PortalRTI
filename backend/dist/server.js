"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
app.use('/uploads', express_1.default.static('uploads'));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/rti_database');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('Mongo connection open');
});
app.use('/account', require('./services/account.service'));
app.use('/students', require('./services/student.service'));
app.use('/workers', require('./services/worker.service'));
app.use('/notifications', require('./services/notification.service'));
app.use('/subjects', require('./services/subject.service'));
app.use('/schedule', require('./services/schedule.service'));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map