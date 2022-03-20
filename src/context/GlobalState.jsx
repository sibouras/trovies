import { useState, createContext, useContext } from 'react';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [list, setList] = useState({ watchlist: [], watched: [] });

  return (
    <GlobalContext.Provider value={{ list, setList }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
