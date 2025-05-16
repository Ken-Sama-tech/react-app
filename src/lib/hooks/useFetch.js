const useFetch = async (url) => {
    const controller = new AbortController();

    const timeOut = setTimeout(() => {
        controller.abort();
    }, 30000)

    try {
        const response = await fetch(url, {
            signal: controller.signal
        });

        clearTimeout(timeOut);

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formattedData = JSON.stringify(data, null, 2);
        return formattedData;
    } catch (error) {

        if (error.name == 'AbortError') {
            console.error('Request timed out.');
            return {
                timeOutError: 'Request timed out.'
            };
        }

        console.error("Fetch error:", error.message);
        return null;
    }
}

export default useFetch;