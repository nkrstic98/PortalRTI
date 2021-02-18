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
    info_projekat: String,
    propozicije: String,
    obavestenja: Array,
    fajlovi_predavanja: Array,
    fajlovi_vezbe: Array,
    fajlovi_ispit: Array,
    fajlovi_lab: Array,
    fajlovi_projekat: Array,
    prikazi_ispit: Boolean,
    prikazi_lab: Boolean,
    prikazi_projekat: Boolean
});
exports.default = mongoose.model('Subject', Subject, 'predmeti');
//# sourceMappingURL=subject.js.map