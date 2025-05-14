import express from 'express';
import animeRouter from './routes/anime.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use('/api', animeRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});