import express from 'express';
import animeRouter from './routes/anime.route.js';
import jikanRouter from './routes/jikan.route.js';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use('/animeApi', animeRouter);
app.use('/jikanApi', jikanRouter);

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});