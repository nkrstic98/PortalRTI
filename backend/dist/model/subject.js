"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const Schema = mongoose.Schema;
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
    espb: {
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
    obavestenja: Array,
    fajlovi_predavanja: Array
});
exports.default = mongoose.model('Subject', Subject, 'predmeti');
//# sourceMappingURL=subject.js.map