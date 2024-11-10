import { useApp } from '../context/AppContext';
import {
  Newspaper,
  TrendingUp,
  HelpCircle,
  Briefcase,
  Users,
  Scale,
  Shield,
  Moon,
  LogOut,
  MessageSquare,
} from 'lucide-react';

export default function Sidebar() {
  const { darkMode, toggleDarkMode, user, logout } = useApp();

  const navItems = [
    { icon: <Newspaper className="w-5 h-5" />, label: 'All News', active: true },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Popular' },
    { icon: <MessageSquare className="w-5 h-5" />, label: 'Ask' },
    { icon: <Users className="w-5 h-5" />, label: 'Show' },
    { icon: <Briefcase className="w-5 h-5" />, label: 'Jobs' },
    { icon: <Users className="w-5 h-5" />, label: 'Community' },
    { icon: <Scale className="w-5 h-5" />, label: 'Legal' },
    { icon: <Shield className="w-5 h-5" />, label: 'Security' },
    { icon: <HelpCircle className="w-5 h-5" />, label: 'FAQ' },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 dark:bg-gray-950 text-gray-300 p-4 flex flex-col border-r border-gray-800 hidden md:flex">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center text-white font-bold">
          Y
        </div>
        <span className="text-xl font-semibold text-white">Hacker News</span>
      </div>

      <nav className="flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 hover:bg-gray-800 dark:hover:bg-gray-900 ${
              item.active ? 'bg-gray-800 dark:bg-gray-900 text-white' : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 hover:bg-gray-800 dark:hover:bg-gray-900"
        >
          <Moon className="w-5 h-5" />
          <span>Dark mode</span>
          <div className={`ml-auto w-10 h-6 rounded-full p-1 ${darkMode ? 'bg-orange-500' : 'bg-gray-700'}`}>
            <div
              className={`w-4 h-4 rounded-full bg-white transform transition-transform ${
                darkMode ? 'translate-x-4' : ''
              }`}
            />
          </div>
        </button>
        {user && (
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-900"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        )}
      </div>
    </aside>
  );
}