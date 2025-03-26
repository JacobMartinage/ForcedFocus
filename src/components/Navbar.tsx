import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Layout, Settings as SettingsIcon } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  return (
    <nav className="bg-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <span className="text-xl font-bold">ForcedFocus</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/'
              )}`}
            >
              <Layout className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/tasks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/tasks'
              )}`}
            >
              <Layout className="h-4 w-4" />
              <span>Tasks</span>
            </Link>

            <Link
              to="/settings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${isActive(
                '/settings'
              )}`}
            >
              <SettingsIcon className="h-4 w-4" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
