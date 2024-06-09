import {useEffect, useState} from 'react';

const useFetch = ({
                      url,
                      options,
                  }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, options);
                setStatus(response.status);
                const json = await response.json();
                setData(json);
                setLoading(false);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);
    // options을 의존하면 무한 요청 발생

    return {
        loading,
        error,
        status,
        data,
    };
};

export default useFetch;
