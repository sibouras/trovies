import { useEffect } from 'react';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';

export function Movie({ types, list, setList }) {
  console.log('Movie');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const type = location.pathname.replace('/movie/', '');
  const page = searchParams.get('page');

  useEffect(() => {
    if (!page && types.indexOf(type) === 1) {
      setSearchParams({ page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (types.indexOf(type) === -1) {
    return (
      <div className='mx-auto max-w-6xl'>
        <Outlet context={{ list, setList }} />
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl px-2'>
      <Outlet
        context={{ type, searchParams, setSearchParams, list, setList }}
      />
    </div>
  );
}
