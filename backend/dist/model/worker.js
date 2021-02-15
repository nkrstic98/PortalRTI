"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Worker = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    website: {
        type: String
    },
    biography: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    office: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Worker', Worker, 'zaposleni');
//# sourceMappingURL=worker.js.map