import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Settings, MessageCircle, Menu, X } from 'lucide-react';
import ProfileInfo from './ProfileInfo';
import SearchBar from './input/SearchBar';
import { useAuthStore } from '../utils/useAuthStore';

const Navbar = ({ userInfo, searchQuery, setSearchQuery, onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => logout(navigate);
  const handleSearch = () => searchQuery && onSearchNote(searchQuery);
  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  const hideOnRoutes = ["/login", "/signUp", "/home"];
  if (hideOnRoutes.includes(location.pathname)) return null;

  return (
    <nav className='bg-zinc-900 text-white shadow-lg sticky top-0 z-50'>
      <div className='flex items-center justify-between px-4 md:px-6 py-3'>
        {/* Brand Title */}
       <Link
        to="/dashboard"
        className="text-3xl md:text-4xl font-extrabold italic tracking-tight bg-gradient-to-r from-pink-400 via-fuchsia-500 to-purple-500 text-transparent bg-clip-text drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
        >
        MilesTogether
      </Link>

        {/* Mobile menu toggle */}
        <button
          className='md:hidden text-white'
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Desktop Nav */}
        {isToken && (
          <div className='hidden md:flex items-center gap-4'>
            {location.pathname === "/dashboard" && (
              <SearchBar
                value={searchQuery}
                onChange={({ target }) => setSearchQuery(target.value)}
                handleSearch={handleSearch}
                onClearSearch={onClearSearch}
              />
            )}
            <Link to="/chat" className="hover:text-pink-400 transition-all duration-200">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <Link to="/profile" className="hover:text-pink-400 transition-all duration-200">
              <Settings className="w-5 h-5 md:w-6 md:h-6" />
            </Link>
            <ProfileInfo userInfo={userInfo} handlelogout={handleLogout} />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && isToken && (
        <div className='md:hidden flex flex-col items-start px-4 pb-4 gap-4 bg-zinc-800'>
          {location.pathname === "/dashboard" && (
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          )}
          <Link to="/chat" className="hover:text-pink-400 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
            <MessageCircle className="inline w-5 h-5 mr-2" /> Chat
          </Link>
          <Link to="/profile" className="hover:text-pink-400 transition-all duration-200" onClick={() => setIsMobileMenuOpen(false)}>
            <Settings className="inline w-5 h-5 mr-2" /> Profile
          </Link>
          <div className='w-full'>
            <ProfileInfo userInfo={userInfo} handlelogout={() => {
              handleLogout();
              setIsMobileMenuOpen(false);
            }} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

