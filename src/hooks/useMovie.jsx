import { useQuery } from 'react-query';

const getMovieById = async (movieId) => {
  const url = `/.netlify/functions/fetch-movies?language=en-US`;
  const response = await fetch(`${url}&movieId=${movieId}`);
  if (!response.ok) {
    throw new Error('Page not found!');
  }
  return response.json();
};

export function useMovie(movieId) {
  return useQuery(['movie', movieId], () => getMovieById(movieId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
