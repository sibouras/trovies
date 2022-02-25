import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_KEY;
const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;

export const useFetch = (searchTerm) => {
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedValue = useDebounce(searchTerm);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}&query=${debouncedValue}`);
        const data = await response.json();
        setResponse(data);
        console.log(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedValue) fetchData();
  }, [debouncedValue]);

  return { response, setResponse, isLoading };
};
