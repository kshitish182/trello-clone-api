"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var appController = __importStar(require("../controller/appController"));
var appRouter = express_1.default.Router();
appRouter.get('/getBoard/:id', appController.getBoardController);
appRouter.get('/getNonMemberUsers/:id', appController.getNonMemberUsersController);
appRouter.post('/createBoard/:id', appController.board);
appRouter.post('/createCard/:id', appController.createCardController);
appRouter.post('/createList/:id', appController.createListController);
appRouter.post('/addMembersInBoard/:id', appController.addMembersinBoardController);
appRouter.put('/updateListLevel/:id', appController.updateListLevelController);
appRouter.put('/updateCardOwner/:id', appController.updateCardOwnerController);
exports.default = appRouter;
