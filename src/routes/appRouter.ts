import express from 'express';
import * as appController from '../controller/appController';

const appRouter = express.Router();

appRouter.get('/getBoard/:id', appController.getBoardController);
appRouter.get('/getNonMemberUsers/:id', appController.getNonMemberUsersController);

appRouter.post('/createBoard/:id', appController.board);
appRouter.post('/createCard/:id', appController.createCardController);
appRouter.post('/createList/:id', appController.createListController);
appRouter.post('/addMembersInBoard/:id', appController.addMembersinBoardController);

appRouter.put('/updateListLevel/:id', appController.updateListLevelController);
appRouter.put('/updateCardOwner/:id', appController.updateCardOwnerController);

appRouter.put('/list/:id/update', appController.listController.update);
appRouter.put('/card/:id/update', appController.cardController.update);
appRouter.put('/board/:id/update', appController.boardController.update);

export default appRouter;
