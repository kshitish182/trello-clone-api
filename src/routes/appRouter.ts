import express from 'express';
import * as appController from '../controller/appController';

const appRouter = express.Router();

appRouter.get('/getBoard/:id', appController.getBoardController);

appRouter.post('/createBoard/:id', appController.board);
appRouter.post('/createCard/:id', appController.createCardController);
appRouter.post('/createList/:id', appController.createListController);

appRouter.put('/updateListLevel/:id', appController.updateListLevelController);
appRouter.put('/updateCardOwner/:id', appController.updateCardOwnerController);

export default appRouter;
