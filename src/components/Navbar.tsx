import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, userProfile, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-primary-500' : 'text-neutral-600 hover:text-primary-500';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-500">
            Partner in Aging
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/" className={`${isActive('/')} font-medium`}>
              Guide
            </Link>
            <Link to="/store" className={`${isActive('/store')} font-medium`}>
              Store
            </Link>
            <Link to="/library" className={`${isActive('/library')} font-medium`}>
              Library
            </Link>
            <Link to="/connect" className={`${isActive('/connect')} font-medium`}>
              Connect
            </Link>
            {user ? (
              <>
                <Link to="/profile" className={`${isActive('/profile')} font-medium`}>
                  Profile
                </Link>
                {userProfile?.role === 'admin' && (
                  <Link to="/admin" className={`${isActive('/admin')} font-medium`}>
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}