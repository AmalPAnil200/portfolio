import React, { useState, useEffect } from 'react';
import { get, post, put, del } from '../utils/api';

const ProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await get('/projects');
      const data = await response.json();
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload file
    setIsUploading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('image', file);

      const token = localStorage.getItem('adminToken');
      const response = await post('/upload/image', formDataObj, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        // Update form data with uploaded image URL
        setFormData({
          ...formData,
          imageUrl: data.filePath
        });
      } else {
        console.error('Upload failed:', data.message);
        alert('Image upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      technologies: '',
      imageUrl: ''
    });
    setImagePreview(null);
    setShowModal(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      imageUrl: project.imageUrl || ''
    });
    setImagePreview(project.imageUrl || null);
    setShowModal(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await del(`/projects/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          fetchProjects(); // Refresh the list
        }
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const requestData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech)
      };
      
      let response;
      if (editingProject) {
        response = await put(`/projects/${editingProject.id}`, requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        response = await post('/projects', requestData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      
      if (response.ok) {
        setShowModal(false);
        fetchProjects(); // Refresh the list
      }
    } catch (error) {
      console.error('Error saving project:', error);
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
            <h1 className="text-3xl font-bold text-white mb-2">Projects Management</h1>
            <p className="text-gray-400">Manage your portfolio projects</p>
          </div>
          <button
            onClick={handleAddProject}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition duration-200"
          >
            <span className="mr-2">+</span> Add Project
          </button>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Project</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Description</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Technologies</th>
                <th className="py-3 px-6 text-left text-gray-300 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-750 transition duration-150">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                      )}
                      <div className="ml-4">
                        <div className="text-white font-medium">{project.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-400 max-w-xs truncate">{project.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditProject(project)}
                        className="text-blue-400 hover:text-blue-300 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(project.id)}
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

      {/* Add/Edit Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
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
                    <label className="block text-gray-300 mb-2">Technologies (comma separated)</label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="React, Node.js, MongoDB"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 mb-2">Image</label>
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <input
                          type="text"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="https://example.com/image.jpg OR upload an image"
                        />
                        <div className="mt-2 text-sm text-gray-400">Enter URL or upload image below</div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="text-gray-400 mx-2">OR</span>
                      </div>
                      
                      <div className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          disabled={isUploading}
                        />
                        {isUploading && (
                          <div className="mt-2 text-sm text-blue-400">Uploading...</div>
                        )}
                      </div>
                    </div>
                    
                    {imagePreview && (
                      <div className="mt-4">
                        <div className="text-gray-300 mb-2">Image Preview:</div>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="max-w-xs max-h-40 object-contain rounded-lg border border-gray-600"
                        />
                      </div>
                    )}
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
                    {editingProject ? 'Update Project' : 'Add Project'}
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

export default ProjectsManagement;