import { useEffect, useRef } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/solid';

export function ListFilter({ list, setList }) {
  const location = useLocation();
  const listType = location.pathname.replace('/', '');
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get('sort') ?? 'popularity';
  const order = searchParams.get('order') ?? 'desc';
  const sortRef = useRef();
  const orderRef = useRef();

  useEffect(() => {
    sortRef.current = sort;
    orderRef.current = order;
    if (!searchParams.get('sort')) return;
    const sortedList = sortList(list[listType], sort, order);
    setList({ ...list, [listType]: sortedList });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    // reset list when component unmounts(without this when clicking on watchlist
    // and the sort != popularity you can see the list changing its order)
    return () => {
      if (sortRef.current === 'popularity' && orderRef.current === 'desc')
        return;
      const sortedList = sortList(list[listType], 'popularity', 'desc');
      setList({ ...list, [listType]: sortedList });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setSearchParams({ sort: e.target.value, order });
  };

  const handleClick = () => {
    const swappedOrder = order === 'desc' ? 'asc' : 'desc';
    setSearchParams({ sort, order: swappedOrder });
  };

  return (
    <div className='flex gap-2'>
      <select
        className='rounded bg-gray-200 px-1 even:bg-gray-100 dark:bg-gray-800'
        value={sort}
        onChange={handleChange}
        title='sort by'
      >
        <option value='popularity'>popularity</option>
        <option value='add_date'>add date</option>
        <option value='release_date'>release date</option>
        <option value='vote_average'>vote average</option>
      </select>
      <button
        className='rounded bg-gray-200 px-1 dark:bg-gray-800'
        onClick={handleClick}
        title='Ascending/Descending'
      >
        {!order || order === 'desc' ? (
          <ArrowDownIcon className='h-5 w-5' />
        ) : (
          <ArrowUpIcon className='h-5 w-5' />
        )}
      </button>
    </div>
  );
}

const sortList = (list, sortValue, order) => {
  switch (sortValue) {
    case 'popularity':
    case 'vote_average':
      return list.sort((a, b) =>
        order === 'desc'
          ? b[sortValue] - a[sortValue]
          : a[sortValue] - b[sortValue]
      );
    case 'add_date':
    case 'release_date':
      return list.sort((a, b) => {
        if (order === 'desc') {
          return b[sortValue] > a[sortValue] ? 1 : -1;
        } else {
          return b[sortValue] < a[sortValue] ? 1 : -1;
        }
      });
    default:
      return list;
  }
};
