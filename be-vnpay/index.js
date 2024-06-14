import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';

import orderRouter from './routers/order.js';
import bodyParser from 'body-parser';
import morgan from 'morgan';

configDotenv();
const port = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
