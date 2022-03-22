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

  const handleClick = (listType, movie) => {
    if (list[listType].find((obj) => obj.id === movie.id)) {
      const newList = list[listType].filter((obj) => obj.id !== movie.id);
      setList({ ...list, [listType]: newList });
    } else {
      setList({ ...list, [listType]: [...list[listType], movie] });
    }
  };

  return (
    <GlobalContext.Provider value={{ list, handleClick }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
