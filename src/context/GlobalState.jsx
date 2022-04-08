import { useState, createContext, useContext, useEffect } from 'react';

const GlobalContext = createContext();

const initialState = localStorage.getItem('list')
  ? JSON.parse(localStorage.getItem('list'))
  : {
      watchlist: [],
      watched: [],
    };

export function GlobalProvider({ children }) {
  const [list, setList] = useState(initialState);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list));
  }, [list]);

  const makeMovie = (movie) => ({
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    popularity: movie.popularity,
    add_date: new Intl.DateTimeFormat('en', {
      timeStyle: 'medium',
      dateStyle: 'short',
      hour12: false,
    }).format(),
  });

  const handleClick = (listType, movie) => {
    const newMovie = makeMovie(movie);
    if (list[listType].find((obj) => obj.id === newMovie.id)) {
      const newList = list[listType].filter((obj) => obj.id !== newMovie.id);
      setList({ ...list, [listType]: newList });
    } else {
      setList({ ...list, [listType]: [...list[listType], newMovie] });
    }
  };

  return (
    <GlobalContext.Provider value={{ list, setList, handleClick }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
