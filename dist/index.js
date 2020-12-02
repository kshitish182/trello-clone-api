"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var app = express_1.default();
// middlewares
app.use(express_1.default.json());
app.use(connectDb);
function connectDb() {
    mongoose_1.default.connect('mongodb://localhost/trelloDB', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(function () { return console.log("Connected"); })
        .catch(function (err) { return console.log("Connection failed: " + err); });
}
connectDb();
app.listen(5000, function () { return console.log('Listening to port 5000'); });
