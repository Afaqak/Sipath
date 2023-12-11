import { useEffect, useState } from 'react';
import useAxios from './useAxios';

const useFetch = (url, config = {}, dispatchAction = null) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const axios = useAxios();


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