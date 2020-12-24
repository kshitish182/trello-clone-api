"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var listSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    level: {
        type: Number,
        required: true,
    },
    card: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'cards'
    }
});
exports.default = listSchema;
// const defaultList = [
//   {
//     name: 'Todo',
//     createdOn: Date.now(),
//     level: 0,
//   },
//   {
//     name: 'In progress',
//     createdOn: Date.now(),
//     level: 1,
//   },
//   {
//     name: 'Done',
//     createdOn: Date.now(),
//     level: 2,
//   },
// ];
