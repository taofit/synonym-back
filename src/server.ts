import express, { Request, Response } from 'express';
import logging from './library/logging';
import synonymRouter from './routes/synonym';

const app = express();
const port: number = 3000;

app.use((req, res, next) => {
    logging.info(`Incoming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logging.info(`Outgoing - STATUS: [${res.statusCode}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    });
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if (req.is('application/json')) {
        logging.info(`Incoming - BODY: ${JSON.stringify(req.body, null, 2)}`);
    }
    next();
});

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Synonym!');
});

//routes
app.use('/synonym', synonymRouter);

//error handling
app.use((req, res) => {
    const error = new Error('404: Page not Found');
    logging.error(error);
    res.status(404).send(error.message);
});

app.listen(port, () => {
    logging.log(`server started at http://localhost:${port}`);
});

export { app };