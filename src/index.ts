import cors from 'cors';
import moongose from 'mongoose';
import express, { NextFunction, Request, Response } from 'express';

import appRouter from './routes/appRouter';
import authRouter from './routes/authRoute';
import { verifyToken } from './utils/jwtToken';

const app = express();

/* verify jwt token */
const validateAuthorization = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1] as string;
  try {
    verifyToken(accessToken);
    next();
  } catch (err) {
    return res.json({
      status: 403,
      message: 'User is not authorized',
    });
  }
};

// middlewares
app.use(express.json());

app.use(connectDb);

app.use(cors());

app.use('/', authRouter);
app.use('/api', validateAuthorization, appRouter);

/* connection to database */

async function connectDb(req: Request, res: Response, next: NextFunction) {
  try {
    await moongose.connect(process.env.MONGO_DB_URI || 'mongodb://localhost/trelloDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../trello-app/build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
