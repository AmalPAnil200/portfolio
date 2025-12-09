import React, { useState, useEffect } from 'react';

const AdminHome = () => {
  const [stats, setStats] = useState({
    projects: 0,
    services: 0,
    messages: 0,
    unreadMessages: 0
  });

  const [recentProjects, setRecentProjects] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    // Fetch stats and recent data
    const fetchDashboardData = async () => {
      try {
        // In a real app, these would be actual API calls
        setStats({
          projects: 12,
          services: 5,
          messages: 24,
          unreadMessages: 3
        });

        setRecentProjects([
          {
            id: 1,
            title: "E-commerce Platform",
            status: "Completed",
            date: "2023-05-15"
          },
          {
            id: 2,
            title: "Mobile Banking App",
            status: "In Progress",
            date: "2023-05-10"
          },
          {
            id: 3,
            title: "Corporate Website",
            status: "Pending",
            date: "2023-05-05"
          }
        ]);

        setRecentMessages([
          {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            subject: "Web Development Inquiry",
            date: "2023-05-15",
            read: false
          },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            subject: "Mobile App Quote",
            date: "2023-05-14",
            read: true
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to your portfolio admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Total Projects</p>
              <p className="text-3xl font-bold text-white">{stats.projects}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <span className="text-2xl">💼</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Services</p>
              <p className="text-3xl font-bold text-white">{stats.services}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Messages</p>
              <p className="text-3xl font-bold text-white">{stats.messages}</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <span className="text-2xl">✉️</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-400">Unread Messages</p>
              <p className="text-3xl font-bold text-white">{stats.unreadMessages}</p>
            </div>
            <div className="bg-red-500/20 p-3 rounded-lg">
              <span className="text-2xl">🔔</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects and Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Projects</h2>
            <button className="text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div>
                  <h3 className="font-medium text-white">{project.title}</h3>
                  <p className="text-sm text-gray-400">{project.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs ${
                  project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                  project.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {project.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Messages</h2>
            <button className="text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div key={message.id} className="flex items-start p-4 bg-gray-700 rounded-lg">
                <div className={`w-3 h-3 rounded-full mt-2 mr-3 ${message.read ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-white">{message.name}</h3>
                    <p className="text-sm text-gray-400">{message.date}</p>
                  </div>
                  <p className="text-gray-400 text-sm">{message.subject}</p>
                  <p className="text-gray-500 text-xs mt-1">{message.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;