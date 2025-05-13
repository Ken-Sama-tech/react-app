import express from 'express';
import animeRouter from './routes/anime.js';

const app = express();
const port = 3000;

app.use('/anime', animeRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});