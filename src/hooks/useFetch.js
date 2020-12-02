import {useState,useEffect} from 'react'

export default function useFetch(url, option){
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        ( async () => {
            try{
                const res = await fetch(url);
                const json = await res.json();
                setResult(json);
                setLoading(false);
            } catch (e) {
                console.log(e)
                setError(e);
                setLoading(false);
            }
        })()
    }, [url,option]);

    return {loading, result, error};
}
