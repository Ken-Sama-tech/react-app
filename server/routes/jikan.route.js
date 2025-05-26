import express from 'express';

const router = express.Router();
const baseUrl = 'https://api.jikan.moe/v4'

router.get('/top/anime/', async (req, res) => {
    const {
        limit,
        page,
        filter,
    } = req.query;

    const url = `${baseUrl}/top/anime?${limit ? `limit=${limit}`: ''}${page ? `&page=${page}`: ''}${filter ? `&filter=${filter}`: ''}`;
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch top anime from external source ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});

router.get('/anime/', async (req, res) => {
    const {
        q,
        limit,
        page,
        sfw,
        sort
    } = req.query;

    const url = `${baseUrl}/anime?${q ? `q=${q}`: ''}${limit ? `&limit=${limit}`: ''}${page ? `&page=${page}`: ''}${sfw ? `&sfw=${sfw}`: ''}${sort ? `&sort=${sort}`: ''}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch anime from external source ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});

router.get('/genres/anime/', async (req, res) => {
    const {
        filter = null
    } = req.query;

    const url = `${baseUrl}/genres/anime?${filter ? `filter=${filter}`: ''}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch anime genres from external source ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (err) {
        res.json({
            Error: err.message
        });
    }
});


export default router;