import useFetch from '../hooks/useFetch'

class JikanApi {

    /** 
     * @param {Object} params - Search parameters.
     * @param {Function} cb - Callback function to receive the result.
     * @param {number} params.limit - Maximum number of results to return.
     * @param {number} params.page - Page number of results.
     */
    constructor() {
        this.baseUrl = 'https://api.jikan.moe/v4';
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

    getAnime = async (params = {}, cb) => {
        const {
            id = 1, request = 'episodes', page = 1
        } = params;

        const animeValidRequest = [...this.validRequest, 'episodes', 'videos', 'streaming', 'staff', 'themes'];

        try {

            if (!animeValidRequest.includes(request)) {
                console.warn(`Valid request are: ${JSON.stringify(animeValidRequest)}`)
                throw new Error(`Invalid Request "${request}"`);
            }

            const url = `${this.baseUrl}/anime/${id}/${request}?page=${page}`;
            useFetch(url).then(res => {
                cb(res)
                return res;
            })

        } catch (error) {
            console.error("Error fetching anime data:", error.message);
            return null;
        }
    }

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
     * 
     * just check their documentation bruhhhh
     */

    searchAnime = async (params = {}, cb) => {
        try {
            const {
                query = '', limit = 10, page = 1, sfw = false, sort = 'desc'
            } = params;

            if (!query)
                return;

            const url = `${this.baseUrl}/anime?q=${query}&limit=${limit}&page=${page}&sort=${sort}&sfw=${sfw}`;

            useFetch(url).then(res => {
                cb(res)
                return res;
            });
        } catch (error) {
            console.error("Error", error.message);
            return null;
        }
    }
}

const jikanApi = new JikanApi()
export default jikanApi;