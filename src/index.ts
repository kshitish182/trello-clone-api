import express from 'express';
import authRouter from './routes/authRoute';
// import moongose, { mongo } from 'mongoose';

const app = express();

// middlewares
app.use(express.json());

// app.use(connectDb);

app.use('/', authRouter);

/* connection to database */

// function connectDb() {
//   moongose
//     .connect('mongodb://localhost/trelloDB', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`Connected`))
//     .catch((err) => console.log(`Connection failed: ${err}`));
// }

// connectDb();

app.listen(5000, () => console.log('Listening to port 5000'));
