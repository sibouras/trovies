import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { AddButton } from './AddButton';
import { formatDate } from '../utils/functions';
import { Bookmark, Check, StarSolid } from '../assets/icons/HeroIcons';
import noImage from '../assets/img/img-not-found.svg';

export function MovieGrid({ movies }) {
  return (
    <div
      className={`grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 ${
        movies.length <= 5
          ? 'sm:grid-cols-[repeat(auto-fit,200px)]'
          : 'min-h-screen'
      }`}
    >
      {movies?.map((movie) => {
        const { id, poster_path, title, release_date } = movie;
        return (
          <div key={id} className='group mb-3'>
            <div className='relative mb-2 w-full overflow-hidden rounded-lg'>
              <Link
                to={`/movie/${id}-${title.replaceAll(' ', '-')}`}
                tabIndex='-1'
              >
                {poster_path ? (
                  <img
                    className='h-full w-full object-cover'
                    src={`https://www.themoviedb.org/t/p/w300${poster_path}`}
                    alt={title}
                  />
                ) : (
                  <img src={noImage} alt='not found' className='bg-gray-400' />
                )}
              </Link>
              <ImageOverlay movie={movie} />
            </div>
            <h3 className='group-hover:text-blue-700 dark:group-hover:text-blue-300'>
              <a
                href={`/movie/${id}-${title.replaceAll(' ', '-')}`}
                title={title}
                className='mt-3 mb-1 inline-block w-fit line-clamp-1 focus:outline-offset-[-1px]'
              >
                {title}
              </a>
            </h3>
            <p className='text-sm group-hover:text-blue-700/90 dark:group-hover:text-blue-300/80'>
              {formatDate(release_date)}
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ImageOverlay({ movie }) {
  const { vote_average, title } = movie;
  return (
    <div
      className={clsx(
        'pointer-events-none absolute top-0 left-0 h-full w-full bg-black/60 text-white',
        'opacity-0 backdrop-blur-sm transition duration-200 group-hover:opacity-100'
      )}
    >
      <div
        className={clsx(
          'flex h-full w-full flex-col items-center justify-center',
          'translate-y-40 transition duration-200 group-hover:translate-y-12'
        )}
      >
        <div className='flex items-center justify-center space-x-1 p-1'>
          <StarSolid className='inline h-5 w-5 text-yellow-300' />
          <span className='font-bold'>{vote_average}</span>
        </div>
        <h3 className='w-full py-2 text-center text-lg'>{title}</h3>
        <div className='pointer-events-auto mt-1 flex space-x-5'>
          <AddButton listType='watched' movie={movie} tabIndex='-1'>
            <Check className='h-6 w-6' />
          </AddButton>
          <AddButton listType='watchlist' movie={movie} tabIndex='-1'>
            <Bookmark className='h-5 w-5' />
          </AddButton>
        </div>
      </div>
    </div>
  );
}
