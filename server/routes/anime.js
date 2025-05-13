import express from 'express';

const router = express.Router();
const baseUrl = 'https://animeapi.skin';

//get episode list
router.get('/:title', async (req, res) => {
    try {
        const {
            title = null,
        } = req.params;

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
router.get('/:title/:ep', async (req, res) => {
    try {
        const {
            title = null,
                ep = null
        } = req.params;

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
router.get('/search/:keywords', async (req, res) => {
    try {
        const {
            keywords = null
        } = req.params

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