import useFetch from '../hooks/useFetch'

class JikanApi {
    constructor() {
        this.baseUrl = 'https://api.jikan.moe/v4';
        this.validFilterParameter = [
            'bypopularity',
            'favorite',
            'airing',
            'upcoming',
            'tv',
            'movie',
            'ova',
            'special',
            'ona',
            'music',
            'cm',
            'pv',
            'tv_special',
        ];
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

    getTopAnime = async (params = {}, cb) => {
        const {
            limit = 10, page = 1, filter = 'bypopularity'
        } = params;

        try {
            if (!this.validFilterParameter.includes(filter)) {
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
}

const jikanApi = new JikanApi()
export default jikanApi;