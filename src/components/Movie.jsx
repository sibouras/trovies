import { Pagination } from './Pagination';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';

export function Movie() {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const type = location.pathname.replace('/movie/', '');

  if (
    ['/movie', 'popular', 'now_playing', 'upcoming', 'top_rated'].indexOf(
      type
    ) === -1
  ) {
    return (
      <div className='mx-auto max-w-6xl'>
        <Outlet />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl px-2'>
      <h1 className='px-3 pt-3 text-2xl capitalize'>
        {type.replace('_', ' ')}
      </h1>
      <Pagination
        placement='top'
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <Outlet context={[type, searchParams, setSearchParams]} />
      <Pagination
        placement='bottom'
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}
