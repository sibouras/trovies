import { useQuery, useQueryClient } from 'react-query';
import { useEffect } from 'react';

const getMovies = async (page, type) => {
  const url = `/.netlify/functions/fetch-movies?language=en-US`;
  const response = await fetch(`${url}&type=${type}&page=${page}`);
  if (!response.ok) {
    throw new Error('Page not found!');
  }
  return response.json();
};

export function useMovies(page, type) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, isPreviousData } = useQuery(
    ['movies', page, type],
    () => getMovies(page, type),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: Infinity,
    }
  );

  // Prefetch the next page
  useEffect(() => {
    if (page < 500) {
      queryClient.prefetchQuery(
        ['movies', page + 1],
        () => getMovies(page + 1, type),
        { staleTime: Infinity }
      );
    }
  }, [data, page, type, queryClient]);

  return { data, isLoading, isError, error, isPreviousData };
}
