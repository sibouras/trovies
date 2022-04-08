import { useGlobalContext } from '../context/GlobalState';
import { MovieGrid } from './MovieGrid';
import { ListFilter } from './ListFilter';

export function WatchList() {
  const { list, setList } = useGlobalContext();
  const { watchlist } = list;

  return (
    <div className='mx-auto max-w-6xl px-2'>
      <div className='my-3 flex justify-between py-3 px-4'>
        <div className='sm:text-lg'>{watchlist.length} movies</div>
        <ListFilter list={list} setList={setList} />
      </div>
      <MovieGrid movies={watchlist} />
    </div>
  );
}
