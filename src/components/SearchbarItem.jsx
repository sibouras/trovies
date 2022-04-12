import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { slugify } from '../utils/functions';

export function SearchbarItem({
  item: { id, poster_path, title, release_date },
}) {
  return (
    <li>
      <Link
        tabIndex='-1'
        to={`movie/${id}-${slugify(title)}`}
        className={clsx(
          'flex space-x-5 px-3 py-2 focus-within:outline-none hover:bg-gray-200 focus:bg-slate-200',
          'focus:outline-offset-[-2px] focus:outline-slate-500 dark:hover:bg-gray-700 dark:focus:bg-slate-700'
        )}
        onClick={() => document.activeElement.blur()}
      >
        {poster_path ? (
          <img
            className='h-20 w-14 flex-shrink-0'
            src={`https://www.themoviedb.org/t/p/w200${poster_path}`}
            alt={title}
          />
        ) : (
          <div className='h-20 w-14 flex-shrink-0 bg-slate-900'></div>
        )}
        <div className='flex flex-col justify-between pb-3'>
          <h1 className=''>{title}</h1>
          <div className='text-xs opacity-80'>
            {release_date ? release_date.substring(0, 4) : '-'}
          </div>
        </div>
      </Link>
    </li>
  );
}
