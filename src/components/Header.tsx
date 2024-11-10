import { Search, Bell } from 'lucide-react';
import { useState } from 'react';
import AuthModal from './AuthModal';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, logout } = useApp();

  return (
    <>
      <div className="h-16 bg-gray-900 dark:bg-gray-950 border-b border-gray-800 flex items-center px-4 md:px-6 gap-4 md:gap-6">
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by titles, urls or authors"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full bg-gray-800 dark:bg-gray-900 text-gray-200 pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>
        
        <button className="relative p-2 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
        </button>
        
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium text-gray-200">{user.name}</div>
              <div className="text-xs text-gray-400">{user.email}</div>
            </div>
            <button
              onClick={logout}
              className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-medium"
            >
              {user.name.charAt(0)}
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Login
          </button>
        )}
      </div>
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}