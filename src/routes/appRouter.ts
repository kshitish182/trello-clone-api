import express from 'express';
import * as appController from '../controller/appController';

const appRouter = express.Router();

appRouter.post('/board', appController.board);
appRouter.get('/board', appController.getBoard);

export default appRouter;
