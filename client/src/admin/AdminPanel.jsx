import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    
    // Verify token and get user data
    const verifyToken = async () => {
      try {
        const response = await fetch('/api/admin/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser({
            name: userData.username || 'Admin User',
            email: `${userData.username || 'admin'}@example.com`
          });
        } else {
          // Token is invalid, redirect to login
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    };
    
    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-gray-800 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div></div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;