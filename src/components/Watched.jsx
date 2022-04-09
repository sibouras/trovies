import { useGlobalContext } from '../context/GlobalState';
import { MovieGrid } from './MovieGrid';
import { ListFilter } from './ListFilter';

export function Watched() {
  const { list, setList } = useGlobalContext();
  const { watched } = list;

  return (
    <div className='mx-auto max-w-6xl px-2'>
      <div className='my-3 flex justify-between py-3 px-4'>
        <div className='sm:text-lg'>{watched.length} movies</div>
        <ListFilter list={list} setList={setList} />
      </div>
      <MovieGrid movies={watched} />
    </div>
  );
}
