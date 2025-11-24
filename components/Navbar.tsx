"use client";

import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faMoon, 
  faSearch,
  faSpinner,
  faSun, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../contexts/MockAuthContext';

// Define the SearchSuggestion interface
interface SearchSuggestion {
  id: string;
  type: string;
  text: string;
  category?: string;
  subcategory?: string;
  query?: string;
  popularity?: number;
  recency?: number;
  confidence?: number;
}

export default function Navbar() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<SearchSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const suggestionsRef = useRef<HTMLFormElement>(null);

  // Debounce search to prevent too many requests
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    const query = searchQuery.trim();
    if (query) {
      setIsSearching(true);
      setShowSuggestions(false);
      
      // Clear any pending search
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      
      // Set a new timeout
      searchTimeoutRef.current = setTimeout(() => {
        router.push({
          pathname: '/search',
          query: { q: query },
        });
        
        // Close mobile menu if open
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
        
        setIsSearching(false);
      }, 300); // 300ms debounce time
    }
  };
  
  // Fetch search suggestions
  const fetchSearchSuggestions = async (query: string) => {
    if (!query.trim()) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/search-suggestions?q=${encodeURIComponent(query)}&type=all`);
      const data = await response.json();
      
      if (data.success && data.suggestions) {
        setSearchSuggestions(data.suggestions.slice(0, 8)); // Limit to 8 suggestions
        setShowSuggestions(data.suggestions.length > 0);
      } else {
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Handle search input change with debounce
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear any pending suggestion fetch
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Fetch suggestions with debounce
    if (value.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        fetchSearchSuggestions(value);
      }, 300); // 300ms debounce time
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    const query = suggestion.query || suggestion.text;
    setSearchQuery(query);
    setShowSuggestions(false);
    
    // Perform search with the selected suggestion
    router.push({
      pathname: '/search',
      query: { q: query },
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    if (stored === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev: 'light' | 'dark') => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      try { localStorage.setItem('theme', next); } catch { }
      return next;
    });
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm' : 'bg-white dark:bg-gray-900'}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">AI Tools Directory</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Home</Link>
            <Link href="/ai-tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Categories</Link>
            <Link href="/best-tools" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-sm">
              Best Tools
            </Link>
            <Link href="/new-tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">New Tools</Link>
            <Link href="/compare" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Compare</Link>
            <Link href="/favorites" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Favorites</Link>
            <Link href="/blog" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Blog</Link>
            <Link href="/ai-updates" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">AI Updates</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Contact</Link>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative" ref={suggestionsRef}>
              <div className="relative flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-md px-2 py-1 transition-all duration-300 hover:border-white/30 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30">
                <FontAwesomeIcon icon={faSearch} className="h-3 w-3 text-gray-400 dark:text-gray-500 mr-1.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                  className="w-32 bg-transparent border-none text-xs text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
                  onFocus={() => searchQuery && setShowSuggestions(searchSuggestions.length > 0)}
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="ml-1 text-gray-400 hover:text-white"
                    aria-label="Clear search"
                  >
                    <FontAwesomeIcon icon={faTimes} className="h-3 w-3" />
                  </button>
                )}
              </div>
              <button 
                type="submit"
                className="absolute right-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Search"
                disabled={isSearching}
              >
                {isSearching ? (
                  <FontAwesomeIcon icon={faSpinner} className="h-3 w-3 animate-spin" />
                ) : (
                  <FontAwesomeIcon icon={faSearch} className="h-3 w-3" />
                )}
              </button>
              
              {/* Search suggestions dropdown */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute z-50 mt-1 w-full bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                  {searchSuggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <FontAwesomeIcon icon={faSearch} className="h-3 w-3 text-gray-400 dark:text-gray-500 mr-2" />
                      <span>{suggestion.text}</span>
                      {suggestion.type && (
                        <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          {suggestion.type}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </form>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <FontAwesomeIcon 
                icon={theme === 'dark' ? faSun : faMoon} 
                className="w-5 h-5" 
                fixedWidth 
              />
            </button>

            {!isAuthenticated && (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/login" className="px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400">Login</Link>
                <Link href="/signup" className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">Sign Up</Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800"
              onClick={() => setIsMenuOpen((v: boolean) => !v)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FontAwesomeIcon icon={faTimes} className="h-6 w-6" /> : <FontAwesomeIcon icon={faBars} className="w-5 h-5" fixedWidth />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ${isMenuOpen ? 'max-h-[600px] border-t border-gray-200 dark:border-gray-800' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-4 space-y-1 bg-white dark:bg-gray-900">
          <form onSubmit={handleSearch} className="mb-2">
            <div className="relative flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 rounded-md px-2 py-1.5 transition-all duration-300 hover:border-white/30 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/30">
              <FontAwesomeIcon icon={faSearch} className="h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="flex-1 bg-transparent border-none text-sm text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="ml-1 text-gray-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <FontAwesomeIcon icon={faTimes} className="h-4 w-4" />
                </button>
              )}
              <button 
                type="submit"
                className="ml-2 text-gray-400 hover:text-white"
                aria-label="Search"
                disabled={isSearching}
              >
                {isSearching ? (
                  <FontAwesomeIcon icon={faSpinner} className="h-4 w-4 animate-spin" />
                ) : (
                  <FontAwesomeIcon icon={faSearch} className="h-4 w-4" />
                )}
              </button>
            </div>
          </form>
          <Link href="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Home</Link>
          <Link href="/ai-tools" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Categories</Link>
          <Link href="/best-tools" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">Best Tools</Link>
          <Link href="/new-tools" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">New Tools</Link>
          <Link href="/compare" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Compare</Link>
          <Link href="/favorites" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Favorites</Link>
          <Link href="/blog" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Blog</Link>
          <Link href="/ai-updates" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">AI Updates</Link>
          <Link href="/about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">About</Link>
          <Link href="/contact" onClick={closeMenu} className="block px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">Contact</Link>

{!isAuthenticated && (
            <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <Link href="/login" onClick={closeMenu} className="flex-1 text-center px-3 py-2 rounded-md text-sm border border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">Login</Link>
                <Link href="/signup" onClick={closeMenu} className="flex-1 text-center px-3 py-2 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700">Sign Up</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}