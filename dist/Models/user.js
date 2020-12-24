"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var userSchema = new mongoose_1.default.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    joinedOn: {
        type: String,
        default: Date.now(),
    },
    boards: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'board',
        },
    ],
});
exports.default = mongoose_1.default.model('user', userSchema);
