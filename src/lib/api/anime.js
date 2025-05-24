import useFetch from "../hooks/useFetch";
import {
    compareTwoStrings
} from "string-similarity";

class AnimeApi {
    constructor() {
        this.baseUrl = 'http://localhost:3000/api/anime';
    }

    getTrending = async (cb) => {

        const url = `${this.baseUrl}/trending`;

        useFetch(url).then(res => {
            cb(res);
            return res;
        });
    }

    getEpisodes = async (params = {}, cb) => {
        let {
            query = '',
        } = params;

        if (query.includes('\\')) {
            query = query.replace(/\\/g, '');
        }

        const url = `${this.baseUrl}/eps?title=${encodeURIComponent(query)}`;

        useFetch(url).then(res => {
            cb(res);
            return res;
        })
    }

    searchAnime = async (params = {}, cb, settings = {}) => {
        let {
            query = ''
        } = params;


        if (query.includes('\\')) {
            query = query.replace(/\\/g, '');
        }

        query = encodeURIComponent(query);

        const url = `${this.baseUrl}/search?keywords=${query}`;

        useFetch(url).then(res => {
            if (!res)
                return;
            cb(res);
            return res;
        })
    }
}

const animeApi = new AnimeApi();
export default animeApi;