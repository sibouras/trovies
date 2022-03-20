import { useOutletContext } from 'react-router-dom';
import clsx from 'clsx';
import { useGlobalContext } from '../context/GlobalState';

export function AddButton({ children, id, listType }) {
  const { type } = useOutletContext();
  const { list, setList } = useGlobalContext();

  const isInList = (listType) => {
    return list[listType].includes(id);
  };

  const handleClick = (listType) => {
    if (isInList(listType)) {
      const newList = list[listType].filter((movieId) => movieId !== id);
      setList({ ...list, [listType]: newList });
    } else {
      setList({ ...list, [listType]: [...list[listType], id] });
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
      onClick={() => handleClick(listType)}
    >
      {children}
    </button>
  );
}
