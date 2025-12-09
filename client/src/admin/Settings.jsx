import React, { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    bio: 'Portfolio administrator'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to the server
    console.log('Profile updated:', profileData);
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In a real app, this would send data to the server
    console.log('Password changed:', passwordData);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    alert('Password changed successfully!');
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your admin panel settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="bg-gray-800 rounded-xl p-4 lg:w-1/4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                  activeTab === 'profile' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Profile Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('password')}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                  activeTab === 'password' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Change Password
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                  activeTab === 'appearance' 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                Appearance
              </button>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-xl p-6 lg:w-3/4">
          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
              <form onSubmit={handleProfileSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'password' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Email Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive email notifications for new messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Push Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive push notifications on your devices</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">SMS Notifications</h3>
                    <p className="text-gray-400 text-sm">Receive SMS notifications for urgent messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Appearance Settings</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-white font-medium mb-3">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg cursor-pointer border-2 border-blue-500">
                      <div className="bg-gray-600 h-8 rounded mb-2"></div>
                      <div className="text-center text-white">Dark</div>
                    </div>
                    <div className="bg-gray-200 p-4 rounded-lg cursor-pointer border-2 border-gray-300">
                      <div className="bg-gray-300 h-8 rounded mb-2"></div>
                      <div className="text-center text-gray-800">Light</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-4 rounded-lg cursor-pointer border-2 border-gray-300">
                      <div className="bg-gradient-to-r from-purple-700 to-blue-700 h-8 rounded mb-2"></div>
                      <div className="text-center text-white">Purple</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-3">Sidebar Position</h3>
                  <div className="flex space-x-4">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Left</button>
                    <button className="bg-gray-700 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-600">Right</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;