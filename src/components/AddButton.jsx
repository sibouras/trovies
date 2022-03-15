import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';

export function AddButton({ children, id, listType }) {
  const { type, watched, setWatched, watchlist, setWatchlist } =
    useOutletContext();

  const isInList = (listType) => {
    const list = listType === 'watched' ? watched : watchlist;
    return list.includes(id);
  };

  const handleClick = (listType) => {
    const list = listType === 'watched' ? watched : watchlist;
    const setList = listType === 'watched' ? setWatched : setWatchlist;
    if (isInList(listType)) {
      const newList = list.filter((movieId) => movieId !== id);
      setList(newList);
    } else {
      setList([...list, id]);
    }
  };

  return (
    <button
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-full bg-gray-200',
        'hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
        isInList(listType)
          ? 'text-green-700 dark:text-green-400'
          : 'text-black dark:text-white'
      )}
      tabIndex={type && '-1'}
      title={
        isInList(listType) ? `remove from ${listType}` : `add to ${listType}`
      }
      onClick={() => {
        handleClick(listType);
      }}
    >
      {children}
    </button>
  );
}
