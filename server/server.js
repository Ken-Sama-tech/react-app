import express from 'express';
import animeRouter from './routes/anime.js';

const app = express();
const port = 3000;

app.use('/api', animeRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});