const useFetch = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok)
            throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        const formattedData = JSON.stringify(data, null, 2);
        return formattedData;
    } catch (error) {
        console.error("Fetch error:", error.message);
        return null;
    }
}

export default useFetch;