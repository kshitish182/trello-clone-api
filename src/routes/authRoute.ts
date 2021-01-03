import express from 'express';
import * as authController from '../controller/authController';

const authRouter = express.Router();

authRouter.post('/login', authController.loginController);

authRouter.post('/register', authController.registerController);

authRouter.get('/verify-token', authController.tokenController);

export default authRouter;
