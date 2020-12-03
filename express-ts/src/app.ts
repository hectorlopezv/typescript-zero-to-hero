//express-typescript-API
import express from 'express';
import todoRoutes from './routes/todo';
import {json} from 'body-parser';

const app = express();

//middle ware to jsonBeautyFy
app.use(json());

//routes Handler
app.use('/todos', todoRoutes);


//simple middleWare
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({message: error.message});
    next();
});

app.listen(3000, () => {
    console.log('We are Running');
});