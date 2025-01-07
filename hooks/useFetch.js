import { useState } from 'react';
import { toast } from 'sonner';

const useFetch = (cb) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const fetchData = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    };
    return { data, loading, error, setData, fetchData };
};

export default useFetch;