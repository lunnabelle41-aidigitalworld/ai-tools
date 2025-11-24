import { useEffect } from 'react';
import { useRouter } from 'next/router';

type SearchEvent = {
  query: string;
  timestamp: number;
  results: Array<{ id: string; title: string }>;
  selectedResult?: string;
};

export function useUserBehavior() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Track page views
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'page_view', {
          page_path: url,
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const trackSearch = (query: string, results: Array<{ id: string; title: string }>) => {
    const searchEvent: SearchEvent = {
      query,
      timestamp: Date.now(),
      results: results.map(r => ({ id: r.id, title: r.title }))
    };
    
    // Store in session storage for personalization
    const searchHistory = JSON.parse(sessionStorage.getItem('searchHistory') || '[]');
    searchHistory.unshift(searchEvent);
    sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory.slice(0, 10)));

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search', {
        search_term: query,
        result_count: results.length,
      });
    }
  };

  const trackResultClick = (query: string, resultId: string, resultTitle: string) => {
    // Update the last search event with the selected result
    const searchHistory = JSON.parse(sessionStorage.getItem('searchHistory') || '[]');
    if (searchHistory.length > 0 && searchHistory[0].query === query) {
      searchHistory[0].selectedResult = resultId;
      sessionStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }

    // Track the click event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'select_content', {
        content_type: 'search_result',
        item_id: resultId,
        search_term: query,
      });
    }
  };

  const getUserSearchHistory = () => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(sessionStorage.getItem('searchHistory') || '[]') as SearchEvent[];
  };

  return {
    trackSearch,
    trackResultClick,
    getUserSearchHistory,
  };
}
