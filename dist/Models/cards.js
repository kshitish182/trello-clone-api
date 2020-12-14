"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var cardSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
    ownedBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'boards',
        required: true,
    },
});
var Cards = mongoose_1.default.model('card', cardSchema);
exports.default = Cards;
