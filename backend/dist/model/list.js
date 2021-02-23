"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Spisak = new Schema({
    naziv: {
        type: String,
        required: true,
        unique: true
    },
    termin: {
        type: String,
        required: true
    },
    mesto_odrzavanja: {
        type: String,
        required: true
    },
    limit: {
        type: Number
    },
    prijavljeni: {
        type: Array,
        required: true
    },
    spisak_otvoren: {
        type: Boolean,
        required: true
    },
    rok_za_prijavu: {
        type: String,
        required: true
    },
    fajlovi: {
        type: Boolean,
        required: true
    },
    autor: {
        type: String,
        required: true
    }
});
exports.default = mongoose_1.default.model('Spisak', Spisak, 'spiskovi_studenata');
//# sourceMappingURL=list.js.map