
import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { ToolkitverseIcon, SparklesIcon, MenuIcon, XIcon } from './icons';
import { useAuth } from '../lib/auth-context';

const Header = () => {
  const { user, logout } = useAuth();
  const [plan, setPlan] = useState<'free' | 'premium'>(() => {
    try {
      return user ? 'premium' : 'free';
    } catch {
      return 'free';
    }
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Close mobile menu on route change
    setIsMenuOpen(false);
  }, [location]);
  
  // Update plan when user authentication status changes
  useEffect(() => {
    setPlan(user ? 'premium' : 'free');
  }, [user]);


  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-slate-800 text-white'
        : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
    }`;
    
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded-md text-base font-medium transition-colors ${
      isActive
        ? 'bg-slate-800 text-white'
        : 'text-slate-300 hover:bg-slate-800/60 hover:text-slate-200'
    }`;

  return (
    <>
      <header className="bg-black/20 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-800/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ToolkitverseIcon size={32} />
                <h1 className="text-xl font-bold tracking-tight gradient-text">
                  Toolkitverse
                </h1>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
                <nav className="flex items-center space-x-2">
                    <NavLink to="/" className={navLinkClasses}>Directory</NavLink>
                    <NavLink to="/compare" className={navLinkClasses}>Compare</NavLink>
                    <NavLink to="/news" className={navLinkClasses}>News</NavLink>
                    <NavLink to="/features" className={navLinkClasses}>Features</NavLink>
                </nav>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  {plan === 'premium' && (
                    <div className="bg-yellow-400/10 text-yellow-300 text-xs font-bold px-3 py-1 rounded-full border border-yellow-400/30 flex items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                      PREMIUM
                    </div>
                  )}
                  <span className="text-sm text-slate-400">
                    {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 px-3 py-2 rounded-md transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm text-slate-400 hover:text-white hover:bg-slate-800/60 px-3 py-2 rounded-md transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/signup"
                    className="group relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:bg-gray-700"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group-hover:w-32 group-hover:h-32 opacity-50"></span>
                    <span className="relative">
                      Create account
                    </span>
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isMenuOpen}
                    aria-label="Open main menu"
                >
                    <span className="sr-only">Open main menu</span>
                    {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-lg z-40" id="mobile-menu" onClick={() => setIsMenuOpen(false)}>
              <div className="pt-20 px-4 space-y-4">
                  <nav className="flex flex-col space-y-2">
                      <NavLink to="/" className={mobileNavLinkClasses}>Directory</NavLink>
                      <NavLink to="/compare" className={mobileNavLinkClasses}>Compare</NavLink>
                      <NavLink to="/news" className={mobileNavLinkClasses}>News</NavLink>
                      <NavLink to="/features" className={mobileNavLinkClasses}>Features</NavLink>
                  </nav>
                  
                  <div className="border-t border-slate-800 pt-4 space-y-4">
                    {user ? (
                      <>
                        {plan === 'premium' && (
                          <div className="bg-yellow-400/10 text-yellow-300 text-sm font-bold w-full text-center px-3 py-2 rounded-md border border-yellow-400/30 flex items-center justify-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/></svg>
                            PREMIUM MEMBER
                          </div>
                        )}
                        <div className="text-center text-sm text-slate-400">
                          Signed in as <span className="font-medium text-slate-300">{user.name}</span>
                        </div>
                        <button
                          onClick={logout}
                          className="w-full text-center text-base text-slate-300 hover:text-white hover:bg-slate-800/60 px-4 py-3 rounded-md transition-colors"
                        >
                          Sign out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block text-center text-base text-slate-300 hover:text-white hover:bg-slate-800/60 px-4 py-3 rounded-md transition-colors"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/signup"
                          className="w-full group relative inline-flex items-center justify-center px-4 py-3 text-base font-semibold text-white bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:bg-gray-700"
                        >
                          <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full group-hover:w-full group-hover:h-full opacity-50"></span>
                          <span className="relative">
                            Create account
                          </span>
                        </Link>
                      </>
                    )}
                  </div>
              </div>
          </div>
      )}
    </>
  );
};

export default Header;