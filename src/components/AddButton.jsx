import clsx from 'clsx';
import { useGlobalContext } from '../context/GlobalState';

export function AddButton({ children, listType, movie, tabIndex }) {
  const { list, handleClick } = useGlobalContext();

  const isInList = list[listType].find((obj) => obj.id === movie.id);

  return (
    <button
      className={clsx(
        'flex h-10 w-10 items-center justify-center rounded-full bg-gray-200',
        'hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700',
        isInList
          ? 'text-green-700 dark:text-green-400'
          : 'text-black dark:text-white'
      )}
      tabIndex={tabIndex}
      title={isInList ? `remove from ${listType}` : `add to ${listType}`}
      onClick={() => handleClick(listType, movie)}
    >
      {children}
    </button>
  );
}
