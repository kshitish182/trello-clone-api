import express from 'express';
import * as authController from '../controller/authController';

const authRouter = express.Router();

authRouter.post('/login', authController.loginController);

authRouter.post('/register', authController.registerController);

export default authRouter;
