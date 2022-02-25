import { Link } from 'react-router-dom';
import { usePagination, DOTS } from '../hooks/usePagination';
import { ChevronLeft, ChevronRight } from '../assets/icons/HeroIcons';
import clsx from 'clsx';

export function Pagination({ placement, searchParams, setSearchParams }) {
  const currentPage = +searchParams.get('page');
  const totalCount = 200;

  const paginationRange = usePagination({
    totalCount,
    pageSize: 1,
    siblingCount: 1,
    currentPage,
  });

  // todo scrolling
  return (
    <div className='flex items-center justify-center py-8 xs:space-x-2 space-x-1'>
      <Controls
        placement={placement}
        currentPage={currentPage}
        disabled={currentPage === 1}
        onClick={() => {
          setSearchParams({ page: currentPage - 1 });
        }}
      >
        <ChevronLeft className='h-6 w-5 xs:h-7 xs:w-6' />
      </Controls>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <div key={`dots${index}`} className='xs:text-lg'>
              &#8230;
            </div>
          );
        }
        return (
          <Link
            key={pageNumber}
            to={`?page=${pageNumber}`}
            className={`block rounded bg-gray-200 py-1 px-3 xs:text-lg ${
              currentPage === pageNumber
                ? 'bg-blue-600 text-white'
                : 'dark:bg-gray-800 '
            }`}
            onClick={() => {
              if (placement === 'bottom') goToTop();
            }}
          >
            {pageNumber}
          </Link>
        );
      })}

      <Controls
        placement={placement}
        currentPage={currentPage}
        disabled={currentPage === totalCount}
        onClick={() => {
          setSearchParams({ page: currentPage + 1 });
        }}
      >
        <ChevronRight className='h-6 w-5 xs:h-7 xs:w-6' />
      </Controls>
    </div>
  );
}

function Controls({ children, placement, disabled, onClick }) {
  return (
    <button
      className={clsx(
        'rounded bg-gray-200 py-1 px-3 hover:text-blue-700 disabled:cursor-not-allowed',
        'disabled:opacity-50 dark:bg-gray-800 dark:hover:text-blue-300 xs:text-xl'
      )}
      disabled={disabled}
      onClick={() => {
        if (placement === 'bottom') goToTop();
        onClick();
      }}
    >
      {children}
    </button>
  );
}

const goToTop = () =>
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
