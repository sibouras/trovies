import { useParams } from 'react-router-dom';
import { useMovie } from '../hooks/useMovie';
import { PageLoading } from './PageLoading';
import { formatDate, formatMinutes } from '../utils/functions';
import { Bookmark, Check, StarSolid } from '../assets/icons/HeroIcons';

export function MoviePage() {
  const params = useParams();
  const movieId = params.movieId.split('-')[0];
  const { data: movieDetails, isLoading } = useMovie(movieId);

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center align-top'>
        <PageLoading className={'h-3/5 w-40 text-gray-500'} />
      </div>
    );
  }

  return (
    <div>
      <div className='py-8 md:flex'>
        <img
          className='mx-auto w-80 rounded-xl'
          src={`https://www.themoviedb.org/t/p/w500${movieDetails?.poster_path}`}
          alt={movieDetails?.title}
        />
        <div className='w-full py-12 px-10'>
          <h2 className='mb-2 text-xl font-bold tracking-wide md:text-3xl'>
            {movieDetails?.title}
          </h2>

          <div className='text-gray-700 dark:text-gray-300'>
            <span>{formatDate(movieDetails?.release_date)}</span>
            <span className='px-2'>|</span>
            {movieDetails?.genres.map(({ name }, index) => {
              return (
                <span key={name}>
                  {name}
                  {movieDetails.genres.length !== index + 1 && ','}{' '}
                </span>
              );
            })}
            <span className='px-2'>|</span>
            <span>{formatMinutes(movieDetails?.runtime)}</span>
          </div>

          <div className='mt-2 flex items-center space-x-4'>
            <div>
              <StarSolid className='mr-1 inline-block h-6 w-6 text-yellow-400' />
              {movieDetails?.vote_average}
              <span className='text-gray-500 dark:text-gray-400'>
                /10 • {movieDetails?.vote_count}
              </span>
            </div>
            <div className='flex space-x-4'>
              <Button title='add to watched'>
                <Check className='h-6 w-6' />
              </Button>
              <Button title='add to watchlist'>
                <Bookmark className='h-5 w-5' />
              </Button>
            </div>
          </div>
          <h4 className='my-3 text-lg md:text-xl'>Overview</h4>
          <p className='text-gray-800 dark:text-gray-200 md:text-lg'>
            {movieDetails?.overview}
          </p>
        </div>
      </div>
    </div>
  );
}

function Button({ children, title }) {
  return (
    <button
      className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 hover:text-blue-400 dark:bg-gray-800'
      title={title}
    >
      {children}
    </button>
  );
}
