"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.addMembersInBoard = exports.getBoard = exports.createBoard = void 0;
var user_1 = __importDefault(require("../Models/user"));
var misc_1 = require("./misc");
var board_1 = __importDefault(require("../Models/board"));
var createBoard = function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var userData, boardId, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, user_1.default.findById(userId)];
            case 1:
                userData = _a.sent();
                if (!userData) {
                    return [2 /*return*/, {
                            status: 404,
                            message: 'User not found',
                        }];
                }
                return [4 /*yield*/, storeBoard(userId, data)];
            case 2:
                boardId = _a.sent();
                storeObjectIdInUser(userData._id, boardId);
                return [2 /*return*/, {
                        status: 201,
                        message: 'Board created successfully',
                        data: {
                            boardId: boardId,
                        },
                    }];
            case 3:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, {
                        status: 400,
                        message: 'There was an error',
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createBoard = createBoard;
var storeObjectIdInUser = function (userId, boardId) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_1.default.findById(userId).select('boards')];
            case 1:
                result = _a.sent();
                result.boards = __spreadArrays(result.boards, [boardId]);
                result.save();
                return [2 /*return*/];
        }
    });
}); };
var storeBoard = function (userId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var board, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                board = new board_1.default({
                    title: data.title,
                    admin: userId,
                    members: [userId],
                });
                return [4 /*yield*/, board.save()];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result._id];
        }
    });
}); };
var getBoard = function (boardId) { return __awaiter(void 0, void 0, void 0, function () {
    var result, boardData, sortedList, appendedList, responseData, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, misc_1.getBoardIfExists(boardId)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, {
                            status: 404,
                            message: 'Board not found',
                        }];
                }
                return [4 /*yield*/, board_1.default.findById(boardId)
                        .select(['title', 'cards', 'lists', 'members'])
                        .populate('cards')
                        .populate('members', ['firstName', 'lastName'])];
            case 2:
                boardData = _a.sent();
                sortedList = boardData.lists.sort(function (value, nextValue) { return value.level - nextValue.level; });
                appendedList = appendCardInList(sortedList, boardData.cards);
                responseData = {
                    _id: boardData._id,
                    title: boardData.title,
                    lists: appendedList,
                    members: boardData.members,
                };
                return [2 /*return*/, {
                        status: 200,
                        message: 'Retrieved all the board',
                        data: responseData,
                    }];
            case 3:
                err_2 = _a.sent();
                return [2 /*return*/, {
                        status: 400,
                        message: "There was an error - " + err_2,
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getBoard = getBoard;
var appendCardInList = function (sortedList, cardData) {
    return sortedList.map(function (list) {
        var filteredCardId = cardData.filter(function (card) { return list._id.toString() === card.ownedBy; });
        return __assign(__assign({}, list.toObject()), { cards: filteredCardId });
    });
};
var addMembersInBoard = function (boardId, data) { return __awaiter(void 0, void 0, void 0, function () {
    var boardData, filteredUserId, userData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, misc_1.getBoardIfExists(boardId, ['members'])];
            case 1:
                boardData = _a.sent();
                if (!boardData) {
                    return [2 /*return*/, {
                            status: 404,
                            message: 'ID not found',
                        }];
                }
                filteredUserId = boardData.members.filter(function (value) { return value._id.toString() === data._id; });
                if (filteredUserId.length) {
                    return [2 /*return*/, {
                            status: 403,
                            message: 'User already exists',
                        }];
                }
                boardData.members = __spreadArrays(boardData.members, [data._id]);
                return [4 /*yield*/, boardData.save()];
            case 2:
                _a.sent();
                return [4 /*yield*/, user_1.default.findById(data._id).select('boards')];
            case 3:
                userData = _a.sent();
                userData.boards = __spreadArrays(userData.boards, [boardId]);
                userData.save();
                return [2 /*return*/, {
                        status: 200,
                        message: 'User saved successfully',
                    }];
            case 4:
                err_3 = _a.sent();
                return [2 /*return*/, {
                        status: 400,
                        message: "There was an error - " + err_3,
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.addMembersInBoard = addMembersInBoard;
