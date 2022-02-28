import { useQuery } from 'react-query';
import { API_KEY } from '../utils/constants';

const getMovieById = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error("couldn't fetch");
  }
  return response.json();
};

export function useMovie(movieId) {
  return useQuery(['movie', movieId], () => getMovieById(movieId), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
