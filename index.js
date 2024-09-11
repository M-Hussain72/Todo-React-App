import express, { json } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import TodoRouter from './routers/TodoRouter.js';
import cors from 'cors';
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Todo App');
});

app.use(cors());

// app.use(cors(
//   {
//     origin:'http://localhost:3000',
//     methods:['POST','GET','PUT','DELETE'],
//     allowedHeaders:["Content_Type"]
//   }
// ))

app.use('/todo', TodoRouter);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('app connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
