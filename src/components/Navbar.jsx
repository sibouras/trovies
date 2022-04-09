import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { NavLink } from 'react-router-dom';
import { Searchbar } from './Searchbar';
import { ChevronDown, Menu, X, Film } from '../assets/icons/HeroIcons';
import clsx from 'clsx';

export function Navbar() {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  return (
    <nav className='bg-gray-100 py-1.5 dark:bg-gray-800'>
      <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-between px-2 sm:px-4'>
        {/* navbar left side */}
        <div className='inline-flex items-center sm:space-x-3'>
          <NavLink
            to='/movie'
            className='hidden items-center p-1 text-2xl xs:flex'
          >
            <Film className='h-6 w-6' />
            <span className='ml-1'>Trovies</span>
          </NavLink>

          <div className='group relative'>
            <button className='mx-2 inline-flex items-center px-2 sm:mx-0 sm:py-2'>
              <span className='mr-2 text-lg'>Movies</span>
              <ChevronDown className='h-4 w-4' />
            </button>
            <div
              className={clsx(
                'pointer-events-none absolute z-20 w-[150%] overflow-hidden rounded-md bg-gray-200 pt-1 opacity-0',
                'group-focus-within:pointer-events-auto group-focus-within:opacity-100 dark:bg-gray-800'
              )}
            >
              {[
                ['Popular', '/movie/popular'],
                ['Now Playing', '/movie/now_playing'],
                ['Upcoming', '/movie/upcoming'],
                ['Top Rated', '/movie/top_rated'],
              ].map(([title, url]) => (
                <NavLink
                  key={title}
                  to={`${url}?page=1`}
                  className={({ isActive }) =>
                    clsx(
                      'whitespace-no-wrap block rounded-t py-2 px-4 hover:bg-gray-300 dark:hover:bg-gray-700',
                      isActive && 'bg-gray-300 dark:bg-gray-700'
                    )
                  }
                  onClick={() => document.activeElement.blur()}
                >
                  {title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* hamburger menu */}
        <button
          className={clsx(
            'rounded-lg p-1 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-50',
            'dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
          )}
          onClick={() => setIsMenuHidden(!isMenuHidden)}
        >
          <Menu className={`${!isMenuHidden ? 'hidden' : ''} h-6 w-6`} />
          <X className={`${isMenuHidden ? 'hidden' : ''} h-6 w-6`} />
        </button>

        {/* navbar right side */}
        <div
          className={`${
            isMenuHidden ? 'hidden' : ''
          } mt-4 w-full items-center md:mt-0 md:flex md:w-auto md:flex-row`}
        >
          <Searchbar />
          <div className='mr-2 mt-3'></div>
          {[
            ['Watched', '/watched'],
            ['Watchlist', '/watchlist'],
          ].map(([title, url]) => (
            <NavLink
              key={title}
              to={url}
              className={({ isActive }) =>
                clsx(
                  'block rounded p-1 px-2 py-2 text-lg hover:bg-white dark:hover:bg-gray-700',
                  'md:hover:bg-transparent md:hover:font-semibold md:dark:hover:bg-transparent',
                  isActive && [
                    'bg-gray-200 font-semibold text-gray-900 hover:bg-gray-200',
                    'dark:bg-gray-900 dark:text-white dark:hover:bg-gray-900',
                    'md:bg-transparent md:text-blue-600 md:dark:bg-transparent md:dark:text-blue-400',
                  ]
                )
              }
            >
              {title}
            </NavLink>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
