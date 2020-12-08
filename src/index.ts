import moongose from 'mongoose';
import appRouter from './routes/appRouter';
import authRouter from './routes/authRoute';
import express, { NextFunction, Request, Response } from 'express';

const app = express();

// middlewares
app.use(express.json());

app.use(connectDb);

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
