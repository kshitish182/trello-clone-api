import cors from 'cors';
import dotenv from 'dotenv';
import moongose from 'mongoose';
import jwt from 'jsonwebtoken';
import express, { NextFunction, Request, Response } from 'express';

import appRouter from './routes/appRouter';
import authRouter from './routes/authRoute';

const app = express();
dotenv.config();

/* verify jwt token */
// const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
//   const accessToken = req.headers.authorization?.split(' ')[1] as string;
//   console.log(req.headers);

//   jwt.verify(accessToken, process.env.SECRET_TOKEN_KEY as string, (err) => {
//     if (err) {
//       res.json({
//         status: 403,
//         message: 'User not authorized',
//       });

//       return;
//     }
//     next();
//   });
// };

// middlewares
app.use(express.json());

app.use(connectDb);

app.use(cors());

app.use('/', authRouter);
app.use('/api', appRouter);

/* connection to database */

async function connectDb(req: Request, res: Response, next: NextFunction) {
  try {
    await moongose.connect('mongodb://localhost/trelloDB', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    next();
  } catch (err) {
    console.log("Could'nt connenct to mongodb", err);

    res.json({
      status: 500,
      message: "Could'nt connect to database",
    });
  }
}

app.listen(5000, () => console.log('Listening to port 5000'));
