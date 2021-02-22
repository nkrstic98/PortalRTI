"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Schedule = new Schema({
    predmet: {
        type: String,
        required: true
    },
    odsek: {
        type: String,
        required: true
    },
    predavanja: {
        type: Array,
        required: true
    },
    vezbe: {
        type: Array,
        required: true
    }
});
exports.default = mongoose_1.default.model('Schedule', Schedule, 'plan_angazovanja');
//# sourceMappingURL=schedule.js.map