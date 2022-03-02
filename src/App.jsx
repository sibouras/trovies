import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Navbar } from './components/Navbar';
import { Watched } from './components/Watched';
import { WatchList } from './components/WatchList';
import { Movie } from './components/Movie';
import { MovieHome } from './components/MovieHome';
import { MoviePage } from './components/MoviePage';

const queryClient = new QueryClient();
const types = ['popular', 'now_playing', 'upcoming', 'top_rated'];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className='min-h-screen bg-white text-black dark:bg-gray-900 dark:text-gray-100'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Navigate replace to='/movie' />} />
            <Route path='/movie' element={<Movie types={types} />}>
              <Route index element={<Navigate replace to='popular?page=1' />} />
              {types.map((path, idx) => (
                <Route key={idx} path={path} element={<MovieHome />} />
              ))}
              <Route path=':movieId' element={<MoviePage />} />
            </Route>
            <Route path='/watchlist' element={<WatchList />} />
            <Route path='/watched' element={<Watched />} />
            <Route path='*' element={<h1>Page doesn't exist</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
