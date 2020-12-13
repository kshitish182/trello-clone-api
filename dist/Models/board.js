"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var listSubSchema = new mongoose_1.default.Schema({
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
var defaultList = [
    {
        name: 'Todo',
        createdOn: Date.now(),
        level: 0,
    },
    {
        name: 'In progress',
        createdOn: Date.now(),
        level: 1,
    },
    {
        name: 'Done',
        createdOn: Date.now(),
        level: 2,
    },
];
var boardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    isArchived: {
        type: Boolean,
        required: true,
    },
    lists: {
        type: [listSubSchema],
        default: defaultList,
    },
});
var Board = mongoose_1.default.model('board', boardSchema);
exports.List = mongoose_1.default.model('list', listSubSchema);
exports.default = Board;
