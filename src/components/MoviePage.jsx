import { useParams } from 'react-router-dom';
import { BookmarkIcon, CheckIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { useMovie } from '../hooks/useMovie';
import { BeatLoader } from '../assets/icons/BeatLoader';
import { AddButton } from './AddButton';
import { formatDate, formatMinutes } from '../utils/functions';

export function MoviePage() {
  const params = useParams();
  const movieId = params.movieId.split('-')[0];
  const { data: movieDetails, isLoading, isError, error } = useMovie(movieId);

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center align-top'>
        <BeatLoader className={'h-3/5 w-40 text-gray-500'} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex h-screen justify-center align-top'>
        <div className='pt-10 text-xl'>{error.message}</div>
      </div>
    );
  }

  return (
    <>
      <div className='py-8 md:flex'>
        <img
          className='mx-auto w-80 rounded-xl'
          src={`https://www.themoviedb.org/t/p/w500${movieDetails.poster_path}`}
          alt={movieDetails.title}
        />
        <div className='w-full py-12 px-10'>
          <h2 className='mb-2 text-xl font-bold tracking-wide md:text-3xl'>
            {movieDetails.title}
          </h2>

          <div className='text-gray-700 dark:text-gray-300'>
            <span>{formatDate(movieDetails.release_date)}</span>
            <span className='px-2'>|</span>
            {movieDetails.genres.map(({ name }, index) => {
              return (
                <span key={name}>
                  {name}
                  {movieDetails.genres.length !== index + 1 && ','}{' '}
                </span>
              );
            })}
            <span className='px-2'>|</span>
            <span>{formatMinutes(movieDetails.runtime)}</span>
          </div>

          <div className='mt-2 flex items-center space-x-4'>
            <div>
              <StarIcon className='mr-1 inline-block h-6 w-6 text-yellow-400' />
              {movieDetails.vote_average}
              <span className='text-gray-500 dark:text-gray-400'>
                /10 • {movieDetails.vote_count}
              </span>
            </div>
            <div className='flex space-x-4'>
              <AddButton movie={movieDetails} listType='watched'>
                <CheckIcon className='h-6 w-6' />
              </AddButton>
              <AddButton movie={movieDetails} listType='watchlist'>
                <BookmarkIcon className='h-5 w-5' />
              </AddButton>
            </div>
          </div>
          <h4 className='my-3 text-lg md:text-xl'>Overview</h4>
          <p className='text-gray-800 dark:text-gray-200 md:text-lg'>
            {movieDetails.overview}
          </p>
        </div>
      </div>
    </>
  );
}
