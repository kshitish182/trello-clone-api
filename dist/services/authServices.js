"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerService = exports.loginService = void 0;
var loginService = function (data) {
    if (data.username) {
        return "Successful";
    }
    else {
        return "failure";
    }
};
exports.loginService = loginService;
var registerService = function (data) {
    if (data.username) {
        return "Registerd";
    }
    else {
        return "Failure";
    }
};
exports.registerService = registerService;
