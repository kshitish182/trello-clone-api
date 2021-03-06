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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.loginService = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var user_1 = __importDefault(require("../Models/user"));
var HASH_SALT_ROUND = 10;
function getUserByLoginCred(email) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_1.default.find({ email: email }).populate('boards', 'title').select('-__v')];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function authenticateUser(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function () {
        var result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bcrypt_1.default.compare(password, hashedPassword)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1, 'There was a error while compairing hash value');
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcrypt_1.default.hash(password, HASH_SALT_ROUND)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
function registerUser(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, user_1.default.insertMany({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: data.password,
                })];
        });
    });
}
var loginService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, isUserAuthentic, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = data.email, password = data.password;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, getUserByLoginCred(email)];
            case 2:
                user = (_a.sent())[0];
                if (!user) {
                    return [2 /*return*/, {
                            status: 404,
                            message: "Could'nt find the user",
                        }];
                }
                return [4 /*yield*/, authenticateUser(password, user.password)];
            case 3:
                isUserAuthentic = _a.sent();
                if (!isUserAuthentic) {
                    return [2 /*return*/, {
                            status: 403,
                            message: 'Login failed - Incorrect user or password',
                        }];
                }
                return [2 /*return*/, {
                        status: 200,
                        message: 'Successfully logged in',
                        data: {
                            _id: user._id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            boards: user.boards,
                        },
                    }];
            case 4:
                err_2 = _a.sent();
                console.log(err_2, 'there was a error');
                return [2 /*return*/, {
                        status: 400,
                        message: "Could'nt log in the user - " + err_2,
                    }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginService = loginService;
function doesUserExist(userEmail) {
    return user_1.default.find({ email: userEmail })
        .then(function (data) { return data; })
        .catch(function (err) {
        console.log(err);
        return [];
    });
}
var registerService = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, user, hashedPassword, userData, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                email = data.email, password = data.password;
                return [4 /*yield*/, doesUserExist(email)];
            case 1:
                user = _a.sent();
                if (user.length > 0) {
                    return [2 /*return*/, {
                            status: 403,
                            message: 'User already exists - Cannot re-register already existing user',
                        }];
                }
                return [4 /*yield*/, hashPassword(password)];
            case 2:
                hashedPassword = _a.sent();
                return [4 /*yield*/, registerUser(__assign(__assign({}, data), { password: hashedPassword }))];
            case 3:
                userData = (_a.sent())[0];
                return [2 /*return*/, {
                        status: 201,
                        message: 'User has been registered sucessfully',
                        data: {
                            _id: userData._id,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            boards: userData.boards,
                        },
                    }];
            case 4:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, { status: 400, message: "User could'nt be registered - " + err_3 }];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerService = registerService;
