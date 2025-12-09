import React, { useState, useEffect } from 'react';
import { get, post, put, del } from '../utils/api';

const DesignWorkManagement = () => {
  const [designWorks, setDesignWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingDesignWork, setEditingDesignWork] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    tags: ''
  });

  useEffect(() => {
    fetchDesignWorks();
  }, []);

  const fetchDesignWorks = async () => {
    try {
      const response = await get('/design-works');
      const data = await response.json();
      setDesignWorks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching design works:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddDesignWork = () => {
    setEditingDesignWork(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      tags: ''
    });
    setShowModal(true);
  };

  const handleEditDesignWork = (designWork) => {
    setEditingDesignWork(designWork);
    setFormData({
      title: designWork.title,
      description: designWork.description,
      imageUrl: designWork.imageUrl || '',
      category: designWork.category,
      tags: designWork.tags ? designWork.tags.join(', ') : ''
    });
    setShowModal(true);
  };

  const handleDeleteDesignWork = async (id) => {
    if (window.confirm('Are you sure you want to delete this design work?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await del(`/design-works/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchDesignWorks(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting design work:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const requestData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      let response;
      if (editingDesignWork) {
        response = await put(`/design-works/${editingDesignWork.id}`, requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        response = await post('/design-works', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      if (response.ok) {
        setShowModal(false);
        fetchDesignWorks(); // Refresh the list
      }
    } catch (error) {
      console.error('Error saving design work:', error);
    }
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
            <h1 className="text-3xl font-bold text-white mb-2">Design Work Management</h1>
            <p className="text-gray-400">Manage your portfolio design works</p>
          </div>
          <button
            onClick={handleAddDesignWork}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
          >
            <span className="mr-2">+</span> Add Design Work
          </button>
        </div>
      </div>

      {/* Design Works Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Design Work</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Category</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Tags</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {designWorks.map((designWork) => (
                <tr key={designWork.id} className="hover:bg-gray-750 transition duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      <div className="ml-4">
                        <div className="text-white font-medium">{designWork.title}</div>
                        <div className="text-gray-400 text-sm mt-1 line-clamp-2">{designWork.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-400">{designWork.category}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {designWork.tags && designWork.tags.map((tag, index) => (
                        <span key={index} className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditDesignWork(designWork)}
                        className="text-blue-400 hover:text-blue-300 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDesignWork(designWork.id)}
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

      {/* Add/Edit Design Work Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingDesignWork ? 'Edit Design Work' : 'Add Design Work'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="title" className="block text-gray-300 font-medium mb-2">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-gray-300 font-medium mb-2">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className="block text-gray-300 font-medium mb-2">Image URL</label>
                    <input
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-gray-300 font-medium mb-2">Category</label>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="tags" className="block text-gray-300 font-medium mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      id="tags"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      placeholder="e.g., logo, branding, web"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
                  >
                    {editingDesignWork ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignWorkManagement;