import { useEffect, useState } from 'react';
import { Sun, Moon } from '../assets/icons/HeroIcons';
import clsx from 'clsx';

const getCurrentTheme = () => {
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  }
  return theme;
};

const loadTheme = (theme) => {
  document.body.setAttribute('class', theme);
};

export function ThemeToggle() {
  const [theme, setTheme] = useState(getCurrentTheme());

  const handleThemeToggle = () => {
    let theme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', `${theme}`);
    loadTheme(theme);
    setTheme(theme);
  };

  useEffect(() => {
    loadTheme(getCurrentTheme());
  }, []);

  return (
    <button
      className={clsx(
        'flex w-full items-center justify-center border-t border-gray-300 p-2',
        'opacity-80 hover:opacity-100 dark:border-gray-700 md:ml-1 md:border-none'
      )}
      onClick={handleThemeToggle}
    >
      {theme === 'dark' ? (
        <Sun className='h-5 w-5' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
    </button>
  );
}
