import express from 'express';

const router = express.Router();
const baseUrl = 'https://animeapi.skin';

//get trending anime
router.get('/anime/trending', async (_, res) => {
    try {
        const response = await fetch(`${baseUrl}/trending`);

        if (!response.ok)
            throw new Error(`Failed to fetch trending anime from external source ${response.status}`);

        const data = await response.json();

        res.json(data)

    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});

//get episode list
router.get('/anime/eps/', async (req, res) => {
    try {
        const {
            title = null,
        } = req.query;;

        const response = await fetch(`${baseUrl}/episodes?title=${title}`);

        if (!response.ok)
            throw new Error(`Failed to fetch episode list from external source ${response.status}`)

        let data = await response.json();

        res.json(data);
    } catch (err) {
        res.json({
            'Error': err.message
        })
    }
});

//get specific ep
router.get('/anime/watch/', async (req, res) => {
    try {
        const {
            title = null,
                ep = null
        } = req.query;;

        const response = await fetch(`${baseUrl}/episodes?title=${title}`);

        if (!response.ok)
            throw new Error(`Failed to fetch episode from external source ${response.status}`)

        let data = await response.json();

        if (ep) {
            data = data.find(d => d.episode == ep)

            if (!data)
                throw new Error('Episode not found')
        }

        res.json(data);
    } catch (err) {
        res.json({
            'Error': err.message
        })
    }
});

//search anime 
router.get('/anime/search/', async (req, res) => {
    try {
        const {
            keywords = ''
        } = req.query;

        const response = await fetch(`${baseUrl}/search?q=${keywords}`);

        if (!response.ok)
            throw new Error(`Failed to fetch from external source ${response.status}`)

        const data = await response.json();

        res.json(data);
    } catch (err) {
        res.json({
            'Error': err.message
        })
    }
});

export default router;