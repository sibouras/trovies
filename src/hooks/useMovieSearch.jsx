import { useDebounce } from './useDebounce';
import { API_KEY } from '../utils/constants';
import { useQuery } from 'react-query';

const getSearchResult = async (debouncedValue) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false`;
  const response = await fetch(`${url}&query=${debouncedValue}`);
  if (!response.ok) {
    throw new Error('Page not found!');
  }
  return response.json();
};

export const useMovieSearch = (searchTerm) => {
  const debouncedValue = useDebounce(searchTerm);
  return useQuery(
    ['movieSearch', debouncedValue],
    () => getSearchResult(debouncedValue),
    {
      enabled: !!debouncedValue,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};
