import express from 'express';
import * as appController from '../controller/appController';

const appRouter = express.Router();

appRouter.post('/board', appController.board);

export default appRouter;
