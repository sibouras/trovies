import { useDebounce } from './useDebounce';
import { useQuery } from 'react-query';

const getSearchResult = async (debouncedValue) => {
  const url = `/.netlify/functions/fetch-movies?language=en-US`;
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
