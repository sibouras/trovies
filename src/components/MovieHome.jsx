import { useOutletContext } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import { PageLoading } from './PageLoading';
import { Pagination } from './Pagination';
import { MovieGrid } from './MovieGrid';

export function MovieHome() {
  console.log('MovieHome')
  const { type, searchParams, setSearchParams } = useOutletContext();
  const page = +searchParams.get('page') || 1;
  const { data, isLoading, isError, error, isPreviousData } = useMovies(
    page,
    type
  );
  const popularResults = data?.results;

  if (isLoading) {
    return (
      <div className='flex h-screen justify-center align-top'>
        <PageLoading className={'h-3/5 w-40 text-gray-500'} />
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
      <MovieGrid popularResults={popularResults} />
      <Pagination
        page={page}
        placement='bottom'
        setSearchParams={setSearchParams}
        isPreviousData={isPreviousData}
      />
    </>
  );
}
