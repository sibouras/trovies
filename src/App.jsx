import { Navbar } from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Watched } from './components/Watched';
import { WatchList } from './components/WatchList';
import { Movie } from './components/Movie';
import { MovieGrid } from './components/MovieGrid';
import { MoviePage } from './components/MoviePage';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Navigate replace to='/movie' />} />
          <Route path='/movie' element={<Movie />}>
            <Route index element={<Navigate replace to='popular' />} />
            {['popular', 'now_playing', 'upcoming', 'top_rated'].map(
              (path, idx) => (
                <Route key={idx} path={path} element={<MovieGrid />} />
              )
            )}
            <Route path=':movieId' element={<MoviePage />} />
          </Route>
          <Route path='/watchlist' element={<WatchList />} />
          <Route path='/watched' element={<Watched />} />
          <Route path='*' element={<h1>Page doesn't exist</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
