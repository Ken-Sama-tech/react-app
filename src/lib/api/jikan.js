import {
    compareTwoStrings
} from 'string-similarity';
import useFetch from '../hooks/useFetch'
import {
    use
} from 'react';

class JikanApi {

    /** 
     * @param {Object} params - Search parameters.
     * @param {Function} cb - Callback function to receive the result.
     * @param {number} params.limit - Maximum number of results to return.
     * @param {number} params.page - Page number of results.
     */
    constructor() {
        this.baseUrl = 'http://localhost:3000/jikanApi';
        this.validRequest = [
            'full',
            'characters',
            'pictures',
            'statistics',
            'moreinfo',
            'news',
            'forum',
            'external',
            'relations',
            'reviews',
            'userupdates',
            'recommendations'
        ];
    }

    /**
     * @param {string} params.request - request type
     */

    // getAnime = async (params = {}, cb) => {
    //     const {
    //         id = 1, request = 'episodes', page = 1
    //     } = params;

    //     const animeValidRequest = [...this.validRequest, 'episodes', 'videos', 'streaming', 'staff', 'themes'];

    //     try {

    //         if (!animeValidRequest.includes(request)) {
    //             console.warn(`Valid request are: ${JSON.stringify(animeValidRequest)}`)
    //             throw new Error(`Invalid Request "${request}"`);
    //         }

    //         const url = `${this.baseUrl}/anime/${id}/${request}?page=${page}`;
    //         useFetch(url).then(res => {
    //             cb(res)
    //             return res;
    //         })

    //     } catch (error) {
    //         console.error("Error fetching anime data:", error.message);
    //         return null;
    //     }
    // }

    /**
     * @param {string} params.filter - filter by field (bypopularity, upcoming, airing, favorite)
     */

    getTopAnime = async (params = {}, cb) => {
        const {
            limit = 10, page = 1, filter = 'bypopularity'
        } = params;

        const validFilterParameter = [
            'bypopularity',
            'favorite',
            'airing',
            'upcoming',
        ];

        try {
            if (!validFilterParameter.includes(filter)) {
                console.warn(`Valid filter parameters are: ${JSON.stringify(this.validFilterParameter)}`)
                throw new Error(`Invalid filter parameter "${filter}"`)
            }
            const url = `${this.baseUrl}/top/anime?limit=${limit}&page=${page}&filter=${filter}`;
            useFetch(url).then(res => {
                cb(res)
                return res;
            })
        } catch (error) {
            console.error("Error fetching top anime data:", error.message);
            return null;
        }
    }

    /**
     * Search for anime using Jikan API.
     * @param {string} params.query - The search keyword.
     * @param {boolean} params.sfw - Safe for work filter.
     * @param {string} params.sort - Sort direction ("desc" or "asc").
     * just check their documentation bruhhhh
     */

    searchAnime = async (params = {}, cb) => {
        try {
            const {
                query = '', limit = null, page = null, sfw = false, sort = 'asc',
            } = params;

            if (!query)
                return;

            const url = `${this.baseUrl}/anime?${ query ? `q=${encodeURIComponent(query)}` : ''}${limit ? `&limit=${limit}`: ''}${page ? `&page=${page}`:''}${sort ? `&sort=${sort}`:''}&sfw=${sfw}`;

            useFetch(url).then(res => {
                if (!res)
                    return;
                cb(res)
                return res;
            });
        } catch (error) {
            console.error("Error", error.message);
            return null;
        }
    }

    getAllAnime = async (params = {}, cb) => {
        const {
            limit = null, page = null
        } = params;

        const url = `${this.baseUrl}/top/anime?${limit ? `limit=${limit}`: ''}${page ? `&page=${page}`: ''}`;
        useFetch(url).then(res => {
            if (!res)
                return;
            cb(res)
            return res;
        });
    }

    getGenres = async (params = {}, cb) => {
        const {
            filter = null
        } = params;
        const validFilterParameters = ['genres', 'explicit_genres', 'themes', 'demographics'];
        const url = `${this.baseUrl}/genres/anime?${validFilterParameters.includes(filter) ? `filter=${filter}`: ''}`;
        useFetch(url).then(res => {
            if (!res)
                return;
            cb(res)
            return res;
        });
    }
}

const jikanApi = new JikanApi()
export default jikanApi;