import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Projects', path: '/admin/projects', icon: '💼' },
    { name: 'Design Works', path: '/admin/design-works', icon: '🎨' },
    { name: 'Services', path: '/admin/services', icon: '⚙️' },
    { name: 'Messages', path: '/admin/messages', icon: '✉️' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' }
  ];

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-10 mt-4">
        <h1 className="text-2xl font-bold text-blue-400">Admin Panel</h1>
        <p className="text-gray-400 text-sm">Portfolio Management</p>
      </div>
      
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Admin User</p>
          <p className="text-white">admin@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;