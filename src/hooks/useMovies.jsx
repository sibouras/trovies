import { useQuery, useQueryClient } from 'react-query';
import { API_KEY } from '../utils/constants';
import { useEffect } from 'react';

export async function getMovies(page, type) {
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US`;
  const response = await fetch(`${url}&page=${page}`);
  if (!response.ok) {
    throw new Error("Error: couldn't fetch");
  }
  return response.json();
}

export function useMovies(page, type) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery(
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
    if (page < data?.total_pages) {
      queryClient.prefetchQuery(
        ['movies', page + 1],
        () => getMovies(page + 1, type),
        { staleTime: Infinity }
      );
    }
  }, [data, page, type, queryClient]);

  return { data, isLoading, isError, error };
}
