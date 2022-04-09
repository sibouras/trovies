import { useOutletContext } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { BeatLoader } from '../assets/icons/BeatLoader';
import { Pagination } from './Pagination';
import { MovieGrid } from './MovieGrid';

export function MovieHome() {
  const { type, searchParams, setSearchParams } = useOutletContext();
  const page = +searchParams.get('page') || 1;
  const { data, isLoading, isError, error, isPreviousData } = useMovies(
    page,
    type
  );

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
      <h1 className='px-3 pt-3 text-2xl capitalize'>
        {type.replace('_', ' ')}
      </h1>
      <Pagination
        page={page}
        placement='top'
        setSearchParams={setSearchParams}
        isPreviousData={isPreviousData}
      />
      <MovieGrid movies={data?.results} />
      <Pagination
        page={page}
        placement='bottom'
        setSearchParams={setSearchParams}
        isPreviousData={isPreviousData}
      />
    </>
  );
}
