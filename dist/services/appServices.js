"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCard = exports.storeList = void 0;
var board_1 = __importDefault(require("../Models/board"));
// export const storeBoard = async (userId: string, data: Board) => {
//   try {
//     const board = new BoardModel({
//       title: data.title,
//       isArchived: data.isArchived,
//       lists: data.lists,
//     });
//     await board.save();
//     const user =
//     return {
//       status: '201',
//       message: 'Board created successfully',
//     };
//   } catch (err) {
//     console.log(err);
//     return {
//       status: '400',
//       message: 'There was an error',
//     };
//   }
// };
// export const getBoards = async () => {
//   const result = await BoardModel.find().select(['title', '_id', 'isArchived', 'createdOn', 'lists']);
//   return result;
// };
var storeList = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var result, updatedList;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, board_1.default.findById(data.params.id).select('lists')];
            case 1:
                result = (_a.sent());
                updatedList = __spreadArrays(result.lists, [{ name: data.body.name, level: data.body.level }]);
                result.lists = updatedList;
                console.log(result);
                result.save();
                return [2 /*return*/];
        }
    });
}); };
exports.storeList = storeList;
var storeCard = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, ownedBy, title, result, listItem;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = data.body, ownedBy = _a.ownedBy, title = _a.title;
                return [4 /*yield*/, board_1.default.findById(data.params.id).select('lists')];
            case 1:
                result = (_b.sent());
                if (!result) {
                    return [2 /*return*/, 'List not found'];
                }
                listItem = result.lists.id('2123123');
                if (!listItem) {
                    return [2 /*return*/, 'List not found'];
                }
                return [2 /*return*/, 'Action completed'];
        }
    });
}); };
exports.storeCard = storeCard;
