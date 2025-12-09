import React, { useState, useEffect } from 'react';
import { get } from '../utils/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [designWorks, setDesignWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 projects initially
  const [selectedDesignWork, setSelectedDesignWork] = useState(null); // For popup zoom

  useEffect(() => {
    // Fetch projects and design works from the backend API
    const fetchData = async () => {
      try {
        // Fetch projects
        const projectsResponse = await get('/projects');
        const projectsData = await projectsResponse.json();
        setProjects(projectsData);
        
        // Fetch design works
        const designWorksResponse = await get('/design-works');
        const designWorksData = await designWorksResponse.json();
        setDesignWorks(designWorksData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to sample data if API fails
        const sampleProjects = [
          {
            id: 1,
            title: "E-commerce Platform",
            description: "A full-featured online shopping platform with payment integration.",
            technologies: ["React", "Node.js", "MongoDB"],
            imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
          },
          {
            id: 2,
            title: "Task Management App",
            description: "A productivity application for managing tasks and team collaboration.",
            technologies: ["Vue.js", "Express", "PostgreSQL"],
            imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
          },
          {
            id: 3,
            title: "Weather Dashboard",
            description: "Real-time weather forecasting application with interactive maps.",
            technologies: ["JavaScript", "Chart.js", "OpenWeather API"],
            imageUrl: "https://images.unsplash.com/photo-1561484930-994b8cb859da?q=80&w=1974&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1561484930-994b8cb859da?q=80&w=1974&auto=format&fit=crop"
          },
          {
            id: 4,
            title: "Fitness Tracker",
            description: "Mobile application for tracking workouts and nutrition goals.",
            technologies: ["React Native", "Firebase", "Redux"],
            imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1974&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1974&auto=format&fit=crop"
          },
          {
            id: 5,
            title: "AI Content Generator",
            description: "Platform that uses machine learning to generate marketing content.",
            technologies: ["Python", "TensorFlow", "FastAPI"],
            imageUrl: "https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?q=80&w=1974&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1677442135722-5f11e06a4e6d?q=80&w=1974&auto=format&fit=crop"
          },
          {
            id: 6,
            title: "Blockchain Voting System",
            description: "Secure and transparent voting platform using blockchain technology.",
            technologies: ["Solidity", "Web3.js", "Ethereum"],
            imageUrl: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?q=80&w=2070&auto=format&fit=crop",
            image: "https://images.unsplash.com/photo-1620336655052-b57986f5a26a?q=80&w=2070&auto=format&fit=crop"
          }
        ];
        
        const sampleDesignWorks = [
          {
            id: 1,
            title: "Modern Logo Design",
            description: "Clean and modern logo design for a tech startup.",
            imageUrl: "https://images.unsplash.com/photo-1618979487250-39ac2b9655a0?q=80&w=1974&auto=format&fit=crop",
            category: "Logo Design",
            tags: ["logo", "branding", "modern"]
          },
          {
            id: 2,
            title: "UI Kit for Mobile App",
            description: "Complete UI kit for a fitness tracking mobile application.",
            imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
            category: "UI Design",
            tags: ["ui", "mobile", "fitness"]
          },
          {
            id: 3,
            title: "Brand Identity",
            description: "Complete brand identity package for a coffee shop.",
            imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
            category: "Branding",
            tags: ["branding", "identity", "coffee"]
          },
          {
            id: 4,
            title: "Web Dashboard",
            description: "Admin dashboard design for a SaaS application.",
            imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
            category: "Web Design",
            tags: ["dashboard", "web", "saas"]
          }
        ];
        
        setProjects(sampleProjects);
        setDesignWorks(sampleDesignWorks);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewMore = () => {
    // Scroll to the design work section
    const designWorkSection = document.getElementById('design-work-section');
    if (designWorkSection) {
      designWorkSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewMoreProjects = () => {
    // Show all projects
    setVisibleProjects(projects.length);
  };

  const handleShowLessProjects = () => {
    // Show only 6 projects
    setVisibleProjects(6);
  };

  const openDesignWorkModal = (designWork) => {
    setSelectedDesignWork(designWork);
  };

  const closeDesignWorkModal = () => {
    setSelectedDesignWork(null);
  };

  if (loading) {
    return (
      <section id="projects" className="py-24 bg-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Web Projects
            </span>
          </h2>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-800 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-black min-h-screen">
      {/* Popup Modal for Design Work Zoom */}
      {selectedDesignWork && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] flex items-center justify-center p-4 cursor-pointer"
          onClick={closeDesignWorkModal}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[80vh]"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/75 transition-colors"
              onClick={closeDesignWorkModal}
            >
              ×
            </button>
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <img 
                src={selectedDesignWork.imageUrl} 
                alt={selectedDesignWork.title} 
                className="w-full h-full object-contain max-h-[65vh]"
              />
              <div className="bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-2xl font-bold">{selectedDesignWork.title}</h3>
                <p className="text-gray-300 mt-1">{selectedDesignWork.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-16">
        <h3 className='text-4xl md:text-[15px] font-light mb-4 text-white/50'>Showcasing some of my best work</h3>
        <h2 className="text-4xl md:text-4xl font-regular mb-4 bg-clip-text tracking-[0.5rem] text-blue-400 text">
          Portfolio
        </h2>
        <div className="w-24 h-0.5 bg-blue-400 mx-auto rounded-full"></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-1/3 z-5 bg-gradient-to-b from-blue-500/20 to-transparent"></div>
      <div className="container mx-auto px-10">
        <h2 className="text-2xl md:text-md font-regular text-left mb-1 px-40">
          <span className="text-white">
            Web Projects
          </span>
        </h2>
        <div className="flex flex-row items-center justify-left mb-5 mt-5 px-40">
          <hr className='w-60 my-2 border-blue-500'></hr>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-6 px-30 ">
          {projects.slice(0, visibleProjects).map((project, index) => (
            <div
              key={project.id}
              className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 mx-auto w-full max-w-xs"
            >
              {/* Project Image with Hover Effect */}
              <div className="relative overflow-hidden h-80">
                <img
                  src={project.imageUrl || project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay content that appears on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-lg font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-200 mb-3 text-xs leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-1.5 py-1 bg-gray-800/50 text-gray-100 rounded-full text-[0.65rem] border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* View Live Button */}
                    <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg font-medium transform transition-all duration-300 hover:from-blue-700 hover:to-blue-900 hover:scale-[1.02]">
                      View Live
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* View More/Less Button for Projects */}
        <div className="flex justify-end mt-12 mb-16 px-40">
          {projects.length > 6 && (
            <button 
              onClick={visibleProjects === 6 ? handleViewMoreProjects : handleShowLessProjects}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-light transform transition-all duration-300 hover:from-blue-700 hover:to-blue-900 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              {visibleProjects === 6 ? 'View More Projects' : 'Show Less Projects'}
            </button>
          )}
        </div>

        {/* Design Work Section */}
        <div id="design-work-section" className="mt-24">
          <h2 className="text-2xl md:text-md font-regular text-left mb-1 px-40">
            <span className="text-white">
              Design Work
            </span>
          </h2>
          <div className="flex flex-row items-center justify-left mb-5 mt-5 px-40">
            <hr className='w-60 my-2 border-blue-500'></hr>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-6 md:mx-[10rem]">
            {designWorks.map((designWork) => (
              <div
                key={designWork.id}
                className="group relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 transform transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => openDesignWorkModal(designWork)}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={designWork.imageUrl}
                    alt={designWork.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
z                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4 bg-black/50 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Interested in collaborating on a project or have a unique idea you'd like to bring to life?
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600/50 to-blue-600 text-white rounded-full font-semibold transform transition-all duration-300 hover:from-blue-700 hover:to-blue-700 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;