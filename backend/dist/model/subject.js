"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Subject = new Schema({
    sifra: {
        type: String,
        unique: true,
        required: true
    },
    naziv: {
        type: String,
        required: true
    },
    tip: {
        type: String,
        required: true
    },
    espb: {
        type: Number,
        required: true
    },
    semestar: {
        type: Number,
        required: true
    },
    odseci: {
        type: Array,
        required: true
    },
    predavanja: {
        type: Number,
        required: true
    },
    vezbe: {
        type: Number,
        required: true
    },
    don: {
        type: Number,
        required: true
    },
    cilj: String,
    ishod: String,
    info_lab: String,
    info_polaganje: String,
    propozicije: String,
    obavestenja: Array
});
exports.default = mongoose_1.default.model('Subject', Subject, 'predmeti');
//# sourceMappingURL=subject.js.map