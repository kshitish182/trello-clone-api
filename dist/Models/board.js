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
    level: {
        type: Number,
        required: true,
    },
});
var defaultList = [
    {
        name: 'Todo',
        level: 0,
    },
    {
        name: 'In progress',
        level: 1,
    },
    {
        name: 'Done',
        level: 2,
    },
];
var boardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    isArchived: {
        type: Boolean,
        default: false,
    },
    lists: {
        type: [listSubSchema],
        default: defaultList,
    },
    cards: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'card',
        },
    ],
});
var Board = mongoose_1.default.model('board', boardSchema);
exports.List = mongoose_1.default.model('list', listSubSchema);
exports.default = Board;
