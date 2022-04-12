import { useEffect } from 'react';

export function useTitle(title) {
  useEffect(() => {
    const oldTitle = document.title;
    if (title) {
      document.title = `${title} - Trovies`;
    }
    return () => (document.title = oldTitle);
  }, [title]);
}
