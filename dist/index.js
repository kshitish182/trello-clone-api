"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var authRoute_1 = __importDefault(require("./routes/authRoute"));
// import moongose, { mongo } from 'mongoose';
var app = express_1.default();
// middlewares
app.use(express_1.default.json());
// app.use(connectDb);
app.use('/', authRoute_1.default);
/* connection to database */
// function connectDb() {
//   moongose
//     .connect('mongodb://localhost/trelloDB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`Connected`))
//     .catch((err) => console.log(`Connection failed: ${err}`));
// }
// connectDb();
app.listen(5000, function () { return console.log('Listening to port 5000'); });
