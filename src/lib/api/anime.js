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

    getEpisodes = async (params = {}, cb) => {

        const {
            title = '', alt = '', repeated = false, retry = 2,
        } = params;

        let query = repeated ? alt : title;

        if (query.includes('\\')) {
            query = query.replace(/\\/g, '');
        }

        query = encodeURIComponent(query);

        const url = `${this.baseUrl}/eps/${query}`;

        try {
            const response = await fetch(url);

            if (!response)
                return;

            if (!response) {
                if (retry > 1)
                    this.getEpisodes({
                        alt: alt,
                        repeated: true,
                        retry: retry - 1
                    }, res => {
                        cb(res)
                        return res;
                    })

                return;
            }

            if (!response.ok) {
                if (response.status == 404) {
                    throw new Error(`No episode found for ${query}`)
                } else {
                    throw new Error('HTTP error! status: ' + response.status)
                }
            }

            const data = await response.json();
            console.log(data)
            cb(data)
            return data;
        } catch (err) {
            cb('unknown')
            console.error({
                Error: err.message
            })
        }

    }

    searchAnime = async (params = {}, cb) => {
        let {
            query = '',
        } = params

        if (query.includes('\\')) {
            query = query.replace(/\\/g, '');
        }

        query = encodeURIComponent(query);

        const url = `${this.baseUrl}/search/${query}`;

        useFetch(url).then(res => {
            cb(res);
            return res;
        })
    }
}

const animeApi = new AnimeApi();
export default animeApi;