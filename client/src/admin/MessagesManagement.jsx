import React, { useState, useEffect } from 'react';
import { get, put, del } from '../utils/api';

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, read, unread

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await get('/admin/contacts');
      const data = await response.json();
      setMessages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await del(`/admin/contacts/${id}`);
        const result = await response.json();
        if (result.success) {
          fetchMessages(); // Refresh the list
          if (selectedMessage && selectedMessage.id === id) {
            setSelectedMessage(null);
          }
        }
      } catch (error) {
        console.error('Error deleting message:', error);
      }
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await put(`/admin/contacts/${id}`, { read: true });
      const result = await response.json();
      if (result.success) {
        fetchMessages(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const handleMarkAsUnread = async (id) => {
    try {
      const response = await put(`/admin/contacts/${id}`, { read: false });
      const result = await response.json();
      if (result.success) {
        fetchMessages(); // Refresh the list
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const filteredMessages = messages.filter(message => {
    if (filter === 'read') return message.read;
    if (filter === 'unread') return !message.read;
    return true;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Messages Management</h1>
            <p className="text-gray-400">Manage contact form submissions</p>
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            filter === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          All Messages
        </button>
        <button
          onClick={() => setFilter('read')}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            filter === 'read' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Read
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-4 py-2 rounded-lg transition duration-200 ${
            filter === 'unread' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Unread
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Messages List */}
        <div className={`bg-gray-800 rounded-xl shadow-lg overflow-hidden ${selectedMessage ? 'lg:w-1/2' : 'w-full'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left text-gray-300 font-medium">Status</th>
                  <th className="py-3 px-6 text-left text-gray-300 font-medium">From</th>
                  <th className="py-3 px-6 text-left text-gray-300 font-medium">Subject</th>
                  <th className="py-3 px-6 text-left text-gray-300 font-medium">Date</th>
                  <th className="py-3 px-6 text-left text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredMessages.map((message) => (
                  <tr 
                    key={message.id} 
                    className={`hover:bg-gray-750 transition duration-150 cursor-pointer ${
                      selectedMessage && selectedMessage.id === message.id ? 'bg-gray-750' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <td className="py-4 px-6">
                      <div className={`w-3 h-3 rounded-full ${message.read ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-white font-medium">{message.name}</div>
                      <div className="text-gray-400 text-sm">{message.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-300 max-w-xs truncate">{message.message.substring(0, 30)}...</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-gray-400">{formatDate(message.date)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex space-x-2">
                        {message.read ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsUnread(message.id);
                            }}
                            className="text-yellow-400 hover:text-yellow-300 transition duration-200"
                          >
                            Mark Unread
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMarkAsRead(message.id);
                            }}
                            className="text-green-400 hover:text-green-300 transition duration-200"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteMessage(message.id);
                          }}
                          className="text-red-400 hover:text-red-300 transition duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Message Detail */}
        {selectedMessage && (
          <div className="bg-gray-800 rounded-xl shadow-lg lg:w-1/2 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedMessage.name}</h2>
                  <p className="text-gray-400">{selectedMessage.email}</p>
                </div>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className={`w-3 h-3 rounded-full mr-2 ${selectedMessage.read ? 'bg-gray-500' : 'bg-green-500'}`}></div>
                  <span className="text-gray-400">{formatDate(selectedMessage.date)}</span>
                </div>
                
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                {selectedMessage.read ? (
                  <button
                    onClick={() => handleMarkAsUnread(selectedMessage.id)}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Mark as Unread
                  </button>
                ) : (
                  <button
                    onClick={() => handleMarkAsRead(selectedMessage.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                >
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManagement;