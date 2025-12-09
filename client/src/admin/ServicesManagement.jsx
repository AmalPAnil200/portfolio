import React, { useState, useEffect } from 'react';
import { get, post, put, del } from '../utils/api';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await get('/services');
      const data = await response.json();
      setServices(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
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

  const handleAddService = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      icon: '',
      features: ''
    });
    setShowModal(true);
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      features: service.features.join(', ')
    });
    setShowModal(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await del(`/services/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchServices(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const requestData = {
        ...formData,
        features: formData.features.split(',').map(feature => feature.trim()).filter(feature => feature)
      };
      
      let response;
      if (editingService) {
        response = await put(`/services/${editingService.id}`, requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        response = await post('/services', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      if (response.ok) {
        setShowModal(false);
        fetchServices(); // Refresh the list
      }
    } catch (error) {
      console.error('Error saving service:', error);
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
            <h1 className="text-3xl font-bold text-white mb-2">Services Management</h1>
            <p className="text-gray-400">Manage your portfolio services</p>
          </div>
          <button
            onClick={handleAddService}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
          >
            <span className="mr-2">+</span> Add Service
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Service</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Description</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Features</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-gray-750 transition duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{service.icon}</div>
                      <div>
                        <div className="text-white font-medium">{service.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-400 max-w-xs truncate">{service.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <span key={index} className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditService(service)}
                        className="text-blue-400 hover:text-blue-300 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id)}
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

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingService ? 'Edit Service' : 'Add New Service'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  &times;
                </button>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Icon (emoji or character)</label>
                    <input
                      type="text"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="💻"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Features (comma separated)</label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature 1, Feature 2, Feature 3"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-8">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
                  >
                    {editingService ? 'Update Service' : 'Add Service'}
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

export default ServicesManagement;