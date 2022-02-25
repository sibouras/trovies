import { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { PageLoading } from './PageLoading';
import { API_KEY } from '../utils/constants';
import { formatDate } from '../utils/functions';
import { Bookmark, Check, StarSolid } from '../assets/icons/HeroIcons';
import noImage from '../assets/img/img-not-found.svg';

export function MovieGrid() {
  const [type, searchParams, setSearchParams] = useOutletContext();
  const [popularResults, setPopularResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US`;

  useEffect(() => {
    const currentPage = +searchParams.get('page') || 1;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${url}&page=${currentPage}`);
        const data = await response.json();
        setPopularResults(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    // + converts null to 0 (searchParams.get returns null when not found)
    if (+searchParams.get('page') <= 0 || +searchParams.get('page') > 200) {
      setSearchParams({ page: '1' });
    } else {
      fetchData();
    }
  }, [searchParams, setSearchParams, url]);

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center align-top'>
        <PageLoading className={'h-3/5 w-40 text-gray-500'} />
      </div>
    );
  }

  return (
    <div className='grid min-h-screen grid-cols-[repeat(auto-fit,minmax(200px,1fr))] place-items-center gap-4'>
      {popularResults?.map(
        ({ id, poster_path, title, release_date, vote_average }) => (
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
              <ImageOverlay vote_average={vote_average} title={title} />
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
        )
      )}
    </div>
  );
}

function ImageOverlay({ vote_average, title }) {
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
          <OverlayButton title='add to watched'>
            <Check className='h-6 w-6' />
          </OverlayButton>
          <OverlayButton title='add to watchlist'>
            <Bookmark className='h-5 w-5' />
          </OverlayButton>
        </div>
      </div>
    </div>
  );
}

function OverlayButton({ children, title }) {
  return (
    <button
      className='flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 hover:text-blue-400'
      title={title}
      tabIndex='-1'
    >
      {children}
    </button>
  );
}
