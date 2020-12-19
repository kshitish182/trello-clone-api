import express from 'express';
import * as appController from '../controller/appController';

const appRouter = express.Router();

appRouter.post('/createBoard/:id', appController.board);
appRouter.post('/createCard/:id', appController.createCardController);
appRouter.post('/createList/:id', appController.createListController);
// appRouter.get('/board', appController.getBoard);
// appRouter.post('/board/:id', appController.storeList);
// appRouter.post('/lists/:id', appController.storeCard);

export default appRouter;
