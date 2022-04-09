import { useRef, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from '@heroicons/react/outline';
import { useMovieSearch } from '../hooks/useMovieSearch';
import { SearchbarItem } from './SearchbarItem';
import { Spinner } from '../assets/icons/css.gg';

export function Searchbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading } = useMovieSearch(searchTerm);
  const results = data?.results ?? [];
  const hasResults = results && results.length > 0;
  const inputRef = useRef();
  const ulRef = useRef();

  const handleKeyDown = (e) => {
    if (!hasResults) return;
    const ul = [...ulRef.current.children];
    const inputIsFocused = document.activeElement === inputRef.current;
    const activeResultIndex = ul.findIndex((child) => {
      return child.querySelector('a') === document.activeElement;
    });

    if (e.key === 'Escape') {
      inputRef.current.focus();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (inputIsFocused) {
        ul[results.length - 1].querySelector('a').focus();
      } else if (ul[activeResultIndex - 1]) {
        ul[activeResultIndex - 1].querySelector('a').focus();
      } else {
        inputRef.current.focus();
      }
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (inputIsFocused) {
        ul[0].querySelector('a').focus();
      } else if (ul[activeResultIndex + 1]) {
        ul[activeResultIndex + 1].querySelector('a').focus();
      } else {
        inputRef.current.focus();
      }
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value == '') {
      ulRef.current.hidden = true;
      setTimeout(() => {
        ulRef.current.hidden = false;
      }, 500);
    }
  };

  return (
    <div
      id='searchbar'
      className='group relative'
      onKeyDown={handleKeyDown}
      role='searchbox'
      tabIndex='-1'
    >
      <div className='flex items-center overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-900'>
        <label htmlFor='search' className='px-3 opacity-80'>
          {isLoading ? (
            <Spinner className='h-6 w-6 animate-spin' />
          ) : (
            <SearchIcon className='h-6 w-6' />
          )}
        </label>
        <input
          ref={inputRef}
          id='search'
          className={clsx(
            'h-10 flex-grow pr-3 text-lg text-gray-500 outline-none focus:text-gray-900',
            'dark:bg-gray-900 dark:text-gray-300 dark:focus:text-gray-100'
          )}
          type='search'
          placeholder='Search Movie...'
          value={searchTerm}
          autoComplete='off'
          onChange={handleChange}
        />
      </div>
      <ul
        ref={ulRef}
        className={clsx(
          'invisible absolute z-10 max-h-96 w-full overflow-auto bg-gray-100 pt-1',
          'group-focus-within:visible dark:bg-gray-800'
        )}
      >
        {hasResults &&
          results.map((item) => <SearchbarItem key={item.id} item={item} />)}
      </ul>
    </div>
  );
}
