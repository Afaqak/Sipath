import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

const useFetch = (url, config = {}, dispatchAction = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axios = useAxiosPrivate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url, config);
        if (dispatchAction) {
          dispatchAction(response.data); 
        } else {
          setData(response.data);
        }
  
      } catch (err) {
        setError(err);
      }
    };
    
    fetchData();
  }, [url]);

  return { data, error };
};

export default useFetch;