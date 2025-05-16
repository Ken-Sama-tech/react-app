import useFetch from "../hooks/useFetch";

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
}

const animeApi = new AnimeApi();
export default animeApi;